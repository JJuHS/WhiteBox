package com.ssafy.whitebox.mainpage.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class MainPageVoteResponseParam {
    private Long voteId;
    private String title;
    private int totalVotes;
    private LocalDateTime expirationDate;
    private String thumbnail1; // 필요한 경우 추가로 썸네일 정보도 포함
}
