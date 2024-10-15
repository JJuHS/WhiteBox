package com.ssafy.whitebox.vote.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class VoteCommentParam {
    private String userNickname;
    private String comment;
    private LocalDateTime postedAt;
    private String userType;
    private int voteType;
    public VoteCommentParam(String userNickname, String comment, LocalDateTime postedAt, String userType, int voteType) {
        this.userNickname = userNickname;
        this.comment = comment;
        this.postedAt = postedAt;
        this.userType = userType;
        this.voteType = voteType;
    }
}
