package com.ssafy.whitebox.community.dto;
import lombok.Getter;
import lombok.Setter;


import java.util.List;
import java.time.LocalDateTime;

@Getter
@Setter
public class CommunityParam {
    private Long comIndex;
    private String comTitle;
    private String comDescription;
    private LocalDateTime comCreatedAt;
    private int comHit;
    private boolean comIsImage;
    private List<CommunityImageParam> images;
    private Long userIndex;
    private String userNickname;
    private List<CommunityCommentParam> comments;
    private int commentCount;
}


