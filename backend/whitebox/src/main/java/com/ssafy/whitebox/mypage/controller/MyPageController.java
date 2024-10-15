package com.ssafy.whitebox.mypage.controller;

import com.ssafy.whitebox.ai.dto.AIDetailResultResponseParam;
import com.ssafy.whitebox.ai.dto.AIResultResponseParam;
import com.ssafy.whitebox.ai.entity.AIResult;
import com.ssafy.whitebox.ai.repository.AIResultRepository;
import com.ssafy.whitebox.community.repository.CommunityRepository;
import com.ssafy.whitebox.mypage.dto.UserCommunityResponseParam;
import com.ssafy.whitebox.mypage.dto.UserInfoResponseParam;
import com.ssafy.whitebox.mypage.dto.UserVoteResponseParam;
import com.ssafy.whitebox.mypage.service.MyPageService;
import com.ssafy.whitebox.user.entity.User;
import com.ssafy.whitebox.user.repository.UserRepository;
import com.ssafy.whitebox.vote.repository.UserVoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.AccessDeniedException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/v1/my")
@RequiredArgsConstructor
public class MyPageController {

    private final MyPageService myPageService;
    private final CommunityRepository communityRepository;
    private final UserRepository userRepository;
    private final AIResultRepository aiResultRepository;
    private final UserVoteRepository userVoteRepository;

    @GetMapping
    public ResponseEntity<UserInfoResponseParam> getUserInfo(@AuthenticationPrincipal UserDetails userDetails) {
        UserInfoResponseParam userInfo = myPageService.getUserInfo(userDetails);
        return ResponseEntity.ok(userInfo);
    }

    @GetMapping("/{videoIndex}")
    public ResponseEntity<AIDetailResultResponseParam> getAIDetailResult(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long videoIndex
    ) throws AccessDeniedException {
        AIResult aiResult = aiResultRepository.findById(videoIndex).orElseThrow(() -> new RuntimeException("Video not found"));
        if (!Objects.equals(aiResult.getUser().userEmail(), userDetails.getUsername())){
            throw new AccessDeniedException("Access denied: You do not have permission to view this video.");
        }
        AIDetailResultResponseParam response = myPageService.getAIDetail(videoIndex);
        return ResponseEntity.ok(response);
    }
    // 개인 영상 확인 API
    @GetMapping("/videos/{pageIndex}")
    public ResponseEntity<Map<String, Object>> getUserVideos(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable int pageIndex) {
        User user = userRepository.findByUserEmail(userDetails.getUsername());
        int totalVideos = aiResultRepository.countByUser(user);
        List<AIResultResponseParam> userVideos = myPageService.getUserVideos(userDetails, pageIndex);
        Map<String, Object> response = new HashMap<>();
        response.put("totalVideos", totalVideos);
        response.put("userVideos", userVideos);
        return ResponseEntity.ok(response);
    }

    // 개인 커뮤니티 리스트 확인 API
    @GetMapping("/community/{pageIndex}")
    public ResponseEntity<Map<String, Object>> getUserCommunities(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable int pageIndex) {
        User user = userRepository.findByUserEmail(userDetails.getUsername());
        int totalCommunities = communityRepository.countByUser(user);
        List<UserCommunityResponseParam> userCommunities = myPageService.getUserCommunities(userDetails, pageIndex);
        Map<String, Object> response = new HashMap<>();
        response.put("totalCommunities", totalCommunities);
        response.put("userCommunities", userCommunities);
        return ResponseEntity.ok(response);
    }

    // 개인 최근 투표 확인 API
    @GetMapping("/prefix/{pageIndex}")
    public ResponseEntity<Map<String, Object>> getUserVotes(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable int pageIndex) {
        User user = userRepository.findByUserEmail(userDetails.getUsername());
        int totalVotes = userVoteRepository.countByUser(user);
        List<UserVoteResponseParam> userVotes = myPageService.getUserVotes(userDetails, pageIndex);
        Map<String, Object> response = new HashMap<>();
        response.put("totalVotes", totalVotes);
        response.put("userVotes", userVotes);
        return ResponseEntity.ok(response);
    }
}
