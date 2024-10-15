package com.ssafy.whitebox.ai.controller;

import com.ssafy.whitebox.ai.dto.LawyerParam;
import com.ssafy.whitebox.ai.entity.Lawyer;
import com.ssafy.whitebox.ai.service.LawyerService;
import com.ssafy.whitebox.user.dto.CustomUserDetails;
import com.ssafy.whitebox.user.entity.User;
import com.ssafy.whitebox.user.service.UserService;
import com.ssafy.whitebox.user.util.UserType;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Date;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/")
public class LawyerController {

    private final LawyerService lawyerService;
    private final UserService userService;
    private final WebClient webClient = WebClient.create();


    @Value("${fastapi.server.url}")
    private String fastapiServerUrl;

    @PostMapping(value = "/verify-lawyer", consumes = {"multipart/form-data"})
    public ResponseEntity<String> verifyLawyer(
            @RequestParam("lawyerName") String lawyerName,
            @RequestParam("lawyerDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date lawyerDate,
            @RequestParam("email") String email,
            @RequestParam("file") MultipartFile file) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        // 변호사 조회
        Lawyer lawyer = lawyerService.findLawyerByNameAndDate(lawyerName, lawyerDate);
        if (lawyer == null) {
            return ResponseEntity.status(404).body("변호사를 찾을 수 없습니다.");
        }

        String img_path = lawyer.getLawyerImageUrl();

        // Python 서버로 이미지 검증 요청
        try {

            ByteArrayResource fileResource = new ByteArrayResource(file.getBytes()) {
                @Override
                public String getFilename() {
                    return file.getOriginalFilename();
                }
            };

            // Multipart 데이터를 구성
            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("img_path", img_path);
            body.add("file", fileResource);

            // WebClient를 사용하여 Python 서버로 데이터 전송
            ResponseEntity<String> response = webClient.post()
                    .uri(fastapiServerUrl +"/api/v1/lawyer")  // Python 서버 URL로 교체
                    .body(BodyInserters.fromMultipartData(body))  // Multipart 데이터 전송
                    .retrieve()
                    .toEntity(String.class)
                    .block();  // 응답을 기다림

            if (response.getStatusCode().is2xxSuccessful() && response.getBody().contains("변호사 인증 성공!")) {
                User user = userService.getUserByEmail(email);
                user.userType(UserType.LAWYER);
                userService.saveUser(user);

                return ResponseEntity.ok("변호사 인증 및 상태 업데이트 완료");
            } else {
                return ResponseEntity.ok("변호사 인증 실패");
            }

        } catch (Exception e) {
            // 이미지 검증 중 오류 발생 시 예외 처리
            return ResponseEntity.status(500).body("이미지 검증 중 오류가 발생했습니다: " + e.getMessage());
        }
    }
}
