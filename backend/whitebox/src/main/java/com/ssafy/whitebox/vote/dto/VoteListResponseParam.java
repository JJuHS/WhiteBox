package com.ssafy.whitebox.vote.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class VoteListResponseParam {
    private Long voteId;
    private String voTitle;
    private String thumbnail1;
    private String thumbnail2;
    private String thumbnail3;
    private String thumbnail4;
    private String nickname;
    private LocalDateTime expirationDate;
    private int totalVotes; // 총 투표 수
    private int commentCount; // 댓글 수
}
