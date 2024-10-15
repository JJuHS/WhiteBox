package com.ssafy.whitebox.vote.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class VoteResponseParam {
    private Long voteId;
    private int approvalCount;    // 찬성 수
    private int oppositeCount;    // 반대 수
    private int neutralCount;     // 중립 수
}
