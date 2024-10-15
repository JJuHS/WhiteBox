package com.ssafy.whitebox.vote.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class VoteImageParam {
    private String imageUrl;
    private LocalDateTime createdAt;

    public VoteImageParam(String imageUrl, LocalDateTime createdAt) {
        this.imageUrl = imageUrl;
        this.createdAt = createdAt;
    }
}
