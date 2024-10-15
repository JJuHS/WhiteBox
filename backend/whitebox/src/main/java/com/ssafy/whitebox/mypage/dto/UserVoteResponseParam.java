package com.ssafy.whitebox.mypage.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserVoteResponseParam {
    private Long voteId;
    private int recentVoteType;
    private int approvalPercent;
    private int oppositePercent;
    private int neutralPercent;
    private int voteCount;
    private int commentCount;
    private String title;
}
