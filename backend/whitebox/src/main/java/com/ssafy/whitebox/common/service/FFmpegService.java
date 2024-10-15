package com.ssafy.whitebox.common.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

@Service
public class FFmpegService {

    @Value("${ffmpeg.path}")
    private String ffmpegPath; // FFmpeg 경로를 application.properties에서 관리

    private final FileStorageService fileStorageService;

    public FFmpegService(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    public String extractThumbnails(MultipartFile videoFile) throws IOException, InterruptedException {
        // 업로드된 비디오 파일을 저장할 임시 파일 생성
        File tempVideoFile = convertMultipartFileToFile(videoFile);

        // 비디오 파일의 총 길이 가져오기
        double videoDuration = getVideoDuration(tempVideoFile);

        // 0, 1/4, 1/2, 3/4 지점의 썸네일 추출
        String thumbnail1Path = captureFrame(tempVideoFile, videoDuration * 0, "thumbnail1.jpg");
        String thumbnail2Path = captureFrame(tempVideoFile, videoDuration * 0.25, "thumbnail2.jpg");
        String thumbnail3Path = captureFrame(tempVideoFile, videoDuration * 0.5, "thumbnail3.jpg");
        String thumbnail4Path = captureFrame(tempVideoFile, videoDuration * 0.75, "thumbnail4.jpg");

        // 임시 비디오 파일 삭제
        tempVideoFile.delete();

        // 썸네일 파일을 FileStorageService를 사용하여 저장
        String savedThumbnail1 = fileStorageService.saveFile(new File(thumbnail1Path), "thumbnail");
        String savedThumbnail2 = fileStorageService.saveFile(new File(thumbnail2Path), "thumbnail");
        String savedThumbnail3 = fileStorageService.saveFile(new File(thumbnail3Path), "thumbnail");
        String savedThumbnail4 = fileStorageService.saveFile(new File(thumbnail4Path), "thumbnail");

        // 저장된 썸네일 파일 경로 반환
        return savedThumbnail1 + ", " + savedThumbnail2 + ", " + savedThumbnail3 + ", " + savedThumbnail4;
    }

    private File convertMultipartFileToFile(MultipartFile file) throws IOException {
        // 고유한 파일명 생성
        String uniqueFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        File convFile = new File(System.getProperty("java.io.tmpdir") + "/" + uniqueFileName);
        try (FileOutputStream fos = new FileOutputStream(convFile)) {
            fos.write(file.getBytes());
        }
        return convFile;
    }

    private String captureFrame(File videoFile, double timestamp, String outputFileName) throws IOException, InterruptedException {
        // 고유한 썸네일 파일명 생성
        String uniqueOutputFileName = generateUniqueFileName(outputFileName);
        File outputImage = new File(System.getProperty("java.io.tmpdir"), uniqueOutputFileName);

        // 동일한 파일이 존재하면 삭제
        if (outputImage.exists()) {
            outputImage.delete();
        }
        System.out.println("----------------------------------------------------------------");
        System.out.println("----------------------------------------------------------------");
        System.out.println("----------------------------------------------------------------");
        System.out.println(ffmpegPath);
        System.out.println("----------------------------------------------------------------");
        System.out.println("----------------------------------------------------------------");
        System.out.println("----------------------------------------------------------------");
        System.out.println("----------------------------------------------------------------");

        ProcessBuilder processBuilder = new ProcessBuilder(
                ffmpegPath,
                "-ss", String.valueOf(timestamp), // 캡처할 시간
                "-i", videoFile.getAbsolutePath(), // 입력 파일 경로
                "-frames:v", "1", // 프레임 수 (1 프레임만 추출)
                "-q:v", "2", // 품질 설정 (1-31, 낮을수록 좋음)
                outputImage.getAbsolutePath() // 출력 파일 경로
        );

        System.out.println("FFmpeg command: " + processBuilder.command());
        // FFmpeg 실행
        Process process = processBuilder.start();
        int exitCode = process.waitFor();

        if (process.isAlive()) {
            process.destroy();
        }

        if (exitCode == 0) {
            return outputImage.getAbsolutePath();
        } else {
            throw new IOException("Error capturing frame at " + timestamp + " seconds.");
        }
    }

    private String generateUniqueFileName(String baseFileName) {
        return UUID.randomUUID().toString() + "_" + System.currentTimeMillis() + "_" + baseFileName;
    }

    private double getVideoDuration(File videoFile) throws IOException, InterruptedException {
        ProcessBuilder processBuilder = new ProcessBuilder(
                ffmpegPath,
                "-i", videoFile.getAbsolutePath(),
                "-f", "null",  // 출력 파일 생성 방지
                "-"
        );

        // 로그 출력
        System.out.println("FFmpeg command: " + processBuilder.command());

        Process process = processBuilder.start();
        StringBuilder output = new StringBuilder();
        StringBuilder errorOutput = new StringBuilder();

        // 표준 출력 스트림 처리
        try (var reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line);
                System.out.println("FFmpeg output: " + line);
            }
        }

        // 에러 출력 스트림 처리
        try (var errorReader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getErrorStream()))) {
            String errorLine;
            while ((errorLine = errorReader.readLine()) != null) {
                errorOutput.append(errorLine);
                System.out.println("FFmpeg error: " + errorLine);
            }
        }

        int exitCode = process.waitFor();
        System.out.println("FFmpeg exited with code: " + exitCode);

        if (exitCode != 0) {
            throw new IOException("Error getting video duration. FFmpeg exited with code: " + exitCode + ". Error message: " + errorOutput.toString());
        }

        // 에러 출력에서 지속 시간 추출
        String durationLine = errorOutput.toString().split("Duration: ")[1].split(",")[0].trim();
        String[] timeParts = durationLine.split(":");
        return Integer.parseInt(timeParts[0]) * 3600 + Integer.parseInt(timeParts[1]) * 60 + Double.parseDouble(timeParts[2]);
    }

}
