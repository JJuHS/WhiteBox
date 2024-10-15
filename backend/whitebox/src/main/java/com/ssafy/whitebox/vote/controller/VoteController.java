package com.ssafy.whitebox.vote.controller;


import com.ssafy.whitebox.vote.dto.*;
import org.springframework.web.multipart.MultipartFile;
import com.ssafy.whitebox.vote.service.VoteService;
import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;


@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class VoteController {

    private final VoteService voteService;

    // 투표글 상세 정보 조회
    @GetMapping("/vote/{voteId}")
    public ResponseEntity<VoteDetailResponseParam> getVoteDetail(@PathVariable Long voteId) {
        VoteDetailResponseParam voteDetail = voteService.getVoteDetail(voteId);
        return ResponseEntity.ok(voteDetail);
    }


    @PostMapping(value = "/vote/{videoId}", produces = "application/json")
    public ResponseEntity<?> createVote(
            @PathVariable Long videoId,
            @RequestPart("title") String title,
            @RequestPart("description") String description,
            @RequestPart("expirationDate") String expirationDate,
            @RequestPart(value = "images", required = false) List<MultipartFile> images) {
        LocalDateTime parsedExpirationDate = LocalDateTime.parse(expirationDate);
        VoteCreateResponseParam response = voteService.createVote(videoId, title, description, parsedExpirationDate, images);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/vote/{voteId}/{voteTarget}")
    public ResponseEntity<VoteResponseParam> castVote(
            @PathVariable Long voteId,
            @PathVariable int voteTarget,
            @AuthenticationPrincipal UserDetails userDetails) { // 인증된 유저 정보 가져오기

        // userDetails에서 userEmail을 추출하여 서비스로 전달
        String userEmail = userDetails.getUsername();
        VoteResponseParam response = voteService.castVote(voteId, voteTarget, userEmail);
        return ResponseEntity.ok(response);
    }

    // 댓글 작성 API
    @PostMapping("vote/{voteId}/comment")
    public ResponseEntity<?> addComment(@PathVariable Long voteId,
                                        @RequestBody VoteCommentCreateParam voteCommentCreateParam,
                                        @AuthenticationPrincipal UserDetails userDetails) {
        String userEmail = userDetails.getUsername(); // AccessToken에서 유저 정보 추출
        voteService.addComment(voteId, voteCommentCreateParam.getComment(), userEmail);
        return ResponseEntity.ok("Comment added successfully");
    }

    // 댓글 삭제 API
    @DeleteMapping("/vote/{voteId}/comment/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Long voteId,
                                           @PathVariable Long commentId,
                                           @AuthenticationPrincipal UserDetails userDetails) {
        String userEmail = userDetails.getUsername(); // AccessToken에서 유저 정보 추출
        voteService.deleteComment(commentId, userEmail);
        return ResponseEntity.ok("Comment deleted successfully");
    }
    @GetMapping("vote/page/{pageIndex}")
    public ResponseEntity<PageResponse<VoteListResponseParam>> getVoteListWithPagination(
            @PathVariable int pageIndex) {
        int pageSize = 10;
        PageResponse<VoteListResponseParam> response = voteService.getVotesWithPagination(pageIndex, pageSize);
        return ResponseEntity.ok(response);
    }

}

