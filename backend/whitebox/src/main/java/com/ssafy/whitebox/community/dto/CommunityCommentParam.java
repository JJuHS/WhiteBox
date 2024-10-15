package com.ssafy.whitebox.community.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
public class CommunityCommentParam {
    private Long id;
    private String comment;
    private String userNickname;
    private LocalDateTime postedAt;
    private String userType;
}
