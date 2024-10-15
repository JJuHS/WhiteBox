package com.ssafy.whitebox.vote.service;

import com.ssafy.whitebox.ai.entity.AIResult;
import com.ssafy.whitebox.ai.repository.AIResultRepository;
import com.ssafy.whitebox.common.service.FileStorageService;
import com.ssafy.whitebox.vote.dto.*;
import com.ssafy.whitebox.vote.entity.Vote;
import com.ssafy.whitebox.vote.entity.VoteImage;
import com.ssafy.whitebox.vote.repository.VoteImageRepository;
import com.ssafy.whitebox.vote.repository.VoteRepository;
import com.ssafy.whitebox.vote.repository.UserVoteRepository;
import com.ssafy.whitebox.vote.entity.UserVote;
import com.ssafy.whitebox.user.entity.User;
import com.ssafy.whitebox.user.repository.UserRepository;
import com.ssafy.whitebox.vote.entity.VoteComment;
import com.ssafy.whitebox.vote.repository.VoteCommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VoteService {

    private final VoteRepository voteRepository;
    private final VoteImageRepository voteImageRepository;
    private final AIResultRepository aiResultRepository;
    private final FileStorageService fileStorageService; // FileStorageService 추가
    private final UserVoteRepository userVoteRepository;
    private final UserRepository userRepository;
    private final VoteCommentRepository voteCommentRepository;


    @Transactional
    public VoteCreateResponseParam createVote(Long videoId, String title, String description, LocalDateTime expirationDate, List<MultipartFile> images) {
        // 1. AIResult에서 videoId에 해당하는 항목 조회

        AIResult aiResult = aiResultRepository.findById(videoId)
                .orElseThrow(() -> new RuntimeException("Video not found"));
        // 1. 이미 존재하는 Vote인지 확인
        if (voteRepository.existsByAiResult(aiResult)) {
            throw new RuntimeException("Vote already exists for this AIResult.");
        }
        // 2. AIResult의 isUploaded를 true로 변경
        aiResult.setUploaded(true);
        aiResultRepository.save(aiResult);

        // 3. Vote 엔티티 생성 및 저장
        Vote vote = new Vote();
        vote.setAiResult(aiResult);
        vote.setUser(aiResult.getUser());
        vote.setVoTitle(title);
        vote.setVoDescription(description);
        vote.setVoCreatedAt(LocalDateTime.now());
        vote.setVoExpirationDate(expirationDate);
        vote.setVoHit(0);
        vote.setVoApprovalCnt(0);
        vote.setVoOppositeCnt(0);
        vote.setVoNeutralCnt(0);
        vote.setVoIsImage(images != null && !images.isEmpty()); // 이미지가 있을 경우 true, 없을 경우 false
        voteRepository.save(vote);

        // 4. 이미지가 있는 경우, 파일을 저장하고 VoteImage 엔티티 생성 및 저장
        if (images != null && !images.isEmpty()) {
            for (MultipartFile image : images) {
                try {
                    String savedFileName = fileStorageService.saveFile(image, "image"); // 파일 저장
                    VoteImage voteImage = new VoteImage();
                    voteImage.setVote(vote);
                    voteImage.setUser(aiResult.getUser());
                    voteImage.setVoImageUrl(savedFileName); // 저장된 파일명을 URL로 사용
                    voteImage.setVoImageCreatedAt(LocalDateTime.now());
                    voteImageRepository.save(voteImage);
                } catch (IOException e) {
                    throw new RuntimeException("Failed to store image", e);
                }
            }
        }

        // 5. 응답 생성
        VoteCreateResponseParam response = new VoteCreateResponseParam();
        response.setVoteId(vote.getVoteId());
        response.setMessage("Vote created successfully");
        return response;
    }
    @Transactional
    public VoteResponseParam castVote(Long voteId, int voteTarget, String userEmail) {
        // 1. 유저 조회 (userEmail을 기반으로)
        User user = userRepository.findByUserEmail(userEmail);

        // 2. 해당 voteId를 가진 Vote 엔티티 조회
        Vote vote = voteRepository.findById(voteId)
                .orElseThrow(() -> new RuntimeException("Vote not found"));

        // 3. 유저가 이전에 투표한 기록이 있는지 조회
//        UserVote existingVote = userVoteRepository.findByAiIndexAndVoterUserIndex(vote.getAiResult().getId(), user.userIndex());
        UserVote existingVote = userVoteRepository.findByUserAndVote(user, vote).orElse(null);
        if (existingVote != null) {
            // 이전에 투표한 기록이 있을 경우, 그 항목의 카운트를 감소
            decreasePreviousVoteCount(vote, existingVote.getRecentVoteType());
        }

        // 4. 새롭게 투표한 항목의 카운트를 증가
        increaseNewVoteCount(vote, voteTarget);

        // 5. 투표 정보 저장
        voteRepository.save(vote);

        // 6. UserVote 엔티티 업데이트 또는 생성
        if (existingVote == null) {
            // 기존 투표 기록이 없을 경우, 새롭게 생성
            existingVote = new UserVote();
//            existingVote.setAiIndex(vote.getAiResult().getId());
//            existingVote.setUserIndex(vote.getUser().userIndex());
//            existingVote.setVoterUserIndex(user.userIndex());
            existingVote.setVote(vote);
            existingVote.setUser(user);
        }

        // 투표 정보를 업데이트
        existingVote.setRecentVoteType(voteTarget);
        userVoteRepository.save(existingVote);

        // 7. 응답 객체 생성 및 반환
        return new VoteResponseParam(vote.getVoteId(), vote.getVoApprovalCnt(), vote.getVoOppositeCnt(), vote.getVoNeutralCnt());
    }

    // 기존 투표 카운트를 감소시키는 메서드
    private void decreasePreviousVoteCount(Vote vote, int previousVoteType) {
        switch (previousVoteType) {
            case 1:
                vote.setVoApprovalCnt(vote.getVoApprovalCnt() - 1); // 찬성
                break;
            case 2:
                vote.setVoOppositeCnt(vote.getVoOppositeCnt() - 1); // 반대
                break;
            case 3:
                vote.setVoNeutralCnt(vote.getVoNeutralCnt() - 1); // 중립
                break;
            default:
                throw new IllegalArgumentException("Invalid vote type");
        }
    }

    // 새로운 투표 카운트를 증가시키는 메서드
    private void increaseNewVoteCount(Vote vote, int newVoteType) {
        switch (newVoteType) {
            case 1:
                vote.setVoApprovalCnt(vote.getVoApprovalCnt() + 1); // 찬성
                break;
            case 2:
                vote.setVoOppositeCnt(vote.getVoOppositeCnt() + 1); // 반대
                break;
            case 3:
                vote.setVoNeutralCnt(vote.getVoNeutralCnt() + 1); // 중립
                break;
            default:
                throw new IllegalArgumentException("Invalid vote type");
        }
    }

    // 댓글 작성 메서드
    public void addComment(Long voteId, String comment, String userEmail) {
        User user = userRepository.findByUserEmail(userEmail);

        Vote vote = voteRepository.findById(voteId)
                .orElseThrow(() -> new RuntimeException("Vote not found"));

        // 유저의 최근 투표 기록 조회
        UserVote userVote = userVoteRepository.findByUserAndVote(user, vote)
                .orElse(null);
        int voteType = 4; // 기본 값: 투표하지 않음

        if (userVote != null) {
            voteType = userVote.getRecentVoteType();
        }

        // 댓글 저장
        VoteComment voteComment = new VoteComment();
        voteComment.setVote(vote);
        voteComment.setUser(user);
        voteComment.setComment(comment);
        voteComment.setVoteType(voteType);
        voteCommentRepository.save(voteComment);
    }

    // 댓글 삭제 메서드
    public void deleteComment(Long commentId, String userEmail) {
        VoteComment voteComment = voteCommentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        if (!voteComment.getUser().userEmail().equals(userEmail)) {
            throw new RuntimeException("Unauthorized to delete this comment");
        }

        voteCommentRepository.deleteById(commentId);
    }
    // 투표 게시글 상세 정보 조회
    @Transactional
    public VoteDetailResponseParam getVoteDetail(Long voteId) {
        // 투표 게시글 조회
        Vote vote = voteRepository.findById(voteId)
                .orElseThrow(() -> new RuntimeException("Vote not found"));
        AIResult aiResult = vote.getAiResult();
        // 조회수 증가
        vote.setVoHit(vote.getVoHit() + 1);
        voteRepository.save(vote);

        // 찬성, 반대, 중립 수의 총합 계산
        int totalVotes = vote.getVoApprovalCnt() + vote.getVoOppositeCnt() + vote.getVoNeutralCnt();
        // 이미지와 댓글 정보 조회
        List<VoteImage> images = voteImageRepository.findByVote(vote);
        List<VoteImageParam> imageParams = images.stream()
                .map(image -> new VoteImageParam(image.getVoImageUrl(), image.getVoImageCreatedAt()))
                .collect(Collectors.toList());
        List<VoteComment> comments = voteCommentRepository.findByVote(vote);
        List<VoteCommentParam> commentParams = comments.stream()
                .map(comment -> new VoteCommentParam(comment.getUser().userNickname(), comment.getComment(), comment.getPostedAt(), comment.getUser().userType().getValue(), comment.getVoteType()))
                .collect(Collectors.toList());
//         총 투표수가 0일 때를 대비하여 예외 처리
        if (totalVotes == 0) {
            return new VoteDetailResponseParam(vote, aiResult, imageParams, commentParams, 0, 0, 0);
        }

        // 백분율 계산
        int approvalPercentage = (int) Math.round((vote.getVoApprovalCnt() / (double) totalVotes) * 100);
        int oppositePercentage = (int) Math.round((vote.getVoOppositeCnt() / (double) totalVotes) * 100);
        int neutralPercentage = (int) Math.round((vote.getVoNeutralCnt() / (double) totalVotes) * 100);

        // 총합이 100이 되도록 조정
        int sum = approvalPercentage + oppositePercentage + neutralPercentage;
        if (sum != 100) {
            int difference = 100 - sum;
            // 가장 큰 값에 차이를 더해줌
            if (approvalPercentage >= oppositePercentage && approvalPercentage >= neutralPercentage) {
                approvalPercentage += difference;
            } else if (oppositePercentage >= approvalPercentage && oppositePercentage >= neutralPercentage) {
                oppositePercentage += difference;
            } else {
                neutralPercentage += difference;
            }
        }



        // 응답 객체 생성
        VoteDetailResponseParam response = new VoteDetailResponseParam(vote, aiResult, imageParams, commentParams, approvalPercentage, oppositePercentage, neutralPercentage);


        return response;
    }

    public PageResponse<VoteListResponseParam> getVotesWithPagination(int pageIndex, int pageSize) {
        PageRequest pageRequest = PageRequest.of(pageIndex - 1, pageSize, Sort.by(Sort.Direction.DESC, "voCreatedAt"));
        Page<Vote> votePage = voteRepository.findAll(pageRequest);

        // Vote 엔티티를 VoteListResponseParam으로 변환하면서 댓글 수, 총 투표 수, 썸네일 추가
        List<VoteListResponseParam> voteList = votePage.map(vote -> {
            VoteListResponseParam voteParam = new VoteListResponseParam();
            voteParam.setVoteId(vote.getVoteId());
            voteParam.setVoTitle(vote.getVoTitle());
            voteParam.setNickname(vote.getUser().userNickname());
            voteParam.setThumbnail1(vote.getAiResult().getThumbnail1());
            voteParam.setThumbnail2(vote.getAiResult().getThumbnail2());
            voteParam.setThumbnail3(vote.getAiResult().getThumbnail3());
            voteParam.setThumbnail4(vote.getAiResult().getThumbnail4());
            voteParam.setExpirationDate(vote.getVoExpirationDate());
            voteParam.setCommentCount(voteCommentRepository.countByVote(vote)); // 댓글 수 추가
            voteParam.setTotalVotes(userVoteRepository.countByVote(vote)); // 총 투표 수 추가
            return voteParam;
        }).getContent();

        long totalVotes = voteRepository.count();

        return new PageResponse<>(totalVotes, voteList);
    }
}
