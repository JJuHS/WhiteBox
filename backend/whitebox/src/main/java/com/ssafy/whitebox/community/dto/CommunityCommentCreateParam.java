package com.ssafy.whitebox.community.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommunityCommentCreateParam {
    private String comment; // 요청 본문에서 comment 필드로 받을 내용
}