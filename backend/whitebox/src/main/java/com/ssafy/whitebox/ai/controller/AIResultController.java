package com.ssafy.whitebox.ai.controller;

import com.ssafy.whitebox.ai.entity.AIResult;
import com.ssafy.whitebox.ai.entity.Lawyer;
import com.ssafy.whitebox.ai.repository.LawyerRepository;
import com.ssafy.whitebox.ai.service.AIResultService;
import com.ssafy.whitebox.user.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class AIResultController {

    private final WebClient webClient;
    private final UserRepository userRepository;
    private final LawyerRepository lawyerRepository;
    private final AIResultService aiResultService;

    @Operation(summary = "AI 영상 분석", description = "비디오를 올리면 교통 사고 분석을 해줍니다.")
    @ApiResponse(responseCode = "200", description = "Successful operation",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = AIResult.class)))
    @PostMapping(value = "/upload-video", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AIResult> uploadVideo(@AuthenticationPrincipal UserDetails userDetails,
                                                @RequestPart("video") MultipartFile videoFile) throws IOException, InterruptedException {
        AIResult aiResult = aiResultService.createAIResult(userDetails.getUsername(), videoFile);
        return ResponseEntity.ok(aiResult);
    }


}
