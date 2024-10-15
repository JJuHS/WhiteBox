package com.ssafy.whitebox.common.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageService {

    private final S3Service s3Service;

    public FileStorageService(S3Service s3Service) {
        this.s3Service = s3Service;
    }

    // MultipartFile 저장 메서드
    public String saveFile(MultipartFile file, String type) throws IOException {
        return saveFile(file.getBytes(), file.getOriginalFilename(), type);
    }

    // File 타입의 파일 저장 메서드
    public String saveFile(File file, String type) throws IOException {
        return saveFile(Files.readAllBytes(file.toPath()), file.getName(), type);
    }

    // 실제 파일 저장을 수행하는 메서드
    private String saveFile(byte[] fileBytes, String originalFilename, String type) throws IOException {
        // 파일명을 UUID로 변경하여 저장 (중복 방지)
        String fileExtension = getFileExtension(originalFilename);
        String savedFileName = UUID.randomUUID().toString() + fileExtension;
        String key = getS3UploadDirectory(type) + "/" + savedFileName;

        // S3에 파일 업로드
        return s3Service.uploadFile(fileBytes, key);
    }

    // 파일 타입에 따른 S3 경로 설정 메서드
    private String getS3UploadDirectory(String type) {
        switch (type) {
            case "image":
                return "images";
            case "video":
                return "videos";
            case "thumbnail":
                return "thumbnails";
            case "video/mp4":
                return "video/mp4";
            default:
                throw new IllegalArgumentException("Invalid file type: " + type);
        }
    }

    // 파일 확장자를 가져오는 메서드
    private String getFileExtension(String fileName) {
        if (fileName != null && fileName.contains(".")) {
            return fileName.substring(fileName.lastIndexOf("."));
        }
        return "";
    }


    public String compressAndSaveFile(MultipartFile file, String type) throws IOException, InterruptedException {
        // 서버에 명시적인 임시 디렉토리 설정 (예: /home/ubuntu/upload/temp)
        String uploadDir = "/home/ubuntu/upload/temp/";
        File dir = new File(uploadDir);

        // 디렉토리가 없으면 생성
        if (!dir.exists()) {
            dir.mkdirs();
        }

        // 원본 파일을 임시 디렉토리에 저장
        File originalFile = new File(uploadDir + file.getOriginalFilename());
        file.transferTo(originalFile);

        // 압축된 파일을 저장할 경로 설정
        String compressedFileName = "compressed_" + file.getOriginalFilename();
        File compressedFile = new File(uploadDir + compressedFileName);

        // 비디오 파일 압축 (1/3 크기)
        compressVideo(originalFile, compressedFile);

        // 압축된 파일을 S3에 업로드
        String compressedVideoUrl = saveFile(Files.readAllBytes(compressedFile.toPath()), compressedFileName, type);

        return compressedVideoUrl;
    }
    private void compressVideo(File inputFile, File outputFile) throws IOException, InterruptedException {
        // FFmpeg 명령어 구성 (비트레이트와 해상도를 더 낮춰서 압축)
        ProcessBuilder processBuilder = new ProcessBuilder(
                "ffmpeg", "-i", inputFile.getAbsolutePath(),
                "-vcodec", "h264", "-acodec", "aac", "-strict", "-2",
                "-b:v", "500k",  // 비디오 비트레이트를 500k로 줄임
                "-b:a", "64k",   // 오디오 비트레이트를 64k로 줄임
                "-vf", "scale=640:360",  // 해상도를 640x360으로 낮춤 (더 작은 크기의 비디오)
                "-preset", "slow",  // 더 느린 압축 프리셋(더 높은 압축률)
                outputFile.getAbsolutePath()
        );

        // FFmpeg 실행
        Process process = processBuilder.start();
        int exitCode = process.waitFor();
        if (exitCode != 0) {
            throw new IOException("FFmpeg failed to compress the video");
        }
    }
}
