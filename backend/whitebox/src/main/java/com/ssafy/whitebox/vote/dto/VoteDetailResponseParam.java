package com.ssafy.whitebox.vote.dto;

import com.ssafy.whitebox.ai.entity.AIResult;
import com.ssafy.whitebox.vote.entity.Vote;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class VoteDetailResponseParam {
    private Long voteId;
    private String title;
    private String description;
    private int approvalPercent;
    private int oppositePercent;
    private int neutralPercent;
    private LocalDateTime createdAt;
    private LocalDateTime expirationDate;
    private int hit;
    private boolean isImage;
    private String nickname;

    // AIResult 정보
    private String aiDescription;
    private String aiExplanation;
    private String aiResult;
    private String aiRelatedLaw;
    private int aiUserFault;
    private int aiOtherFault;
    private String videoUrl;

    // 이미지 리스트
    private List<VoteImageParam> images;

    // 댓글 리스트
    private List<VoteCommentParam> comments;
    private int commentsCount;
    private int votesCount;
    public VoteDetailResponseParam(){

    }
    // 생성자
    public VoteDetailResponseParam(Vote vote, AIResult aiResult, List<VoteImageParam> images, List<VoteCommentParam> comments, int approvalPercent, int oppositePercent, int neutralPercent) {
        this.voteId = vote.getVoteId();
        this.nickname = vote.getUser().userNickname();
        this.title = vote.getVoTitle();
        this.description = vote.getVoDescription();
        this.approvalPercent = approvalPercent;
        this.oppositePercent = oppositePercent;
        this.neutralPercent = neutralPercent;
        this.createdAt = vote.getVoCreatedAt();
        this.expirationDate = vote.getVoExpirationDate();
        this.hit = vote.getVoHit();
        this.isImage = vote.isVoIsImage();

        // AIResult 정보
        this.aiDescription = aiResult.getAiDescription();
        this.aiExplanation = aiResult.getAiExplanation();
        this.aiResult = aiResult.getAiResult();
        this.aiRelatedLaw = aiResult.getAiRelatedLaw();
        this.aiUserFault = aiResult.getAiUserFault();
        this.aiOtherFault = aiResult.getAiOtherFault();
        this.videoUrl = aiResult.getVideoUrl();

        // 이미지 및 댓글 리스트
        this.images = images;
        this.comments = comments;
        this.commentsCount = comments.size();
        this.votesCount = vote.getVoApprovalCnt() + vote.getVoNeutralCnt() + vote.getVoOppositeCnt();
    }
}
