package com.ssafy.whitebox.mainpage.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class MainPageCommunityResponseParam {
    private Long comId;
    private String title;
    private int hit;
    private LocalDateTime createdAt;
}
