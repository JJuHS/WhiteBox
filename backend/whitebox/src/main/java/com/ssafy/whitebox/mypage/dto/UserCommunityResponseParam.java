package com.ssafy.whitebox.mypage.dto;


import lombok.Getter;
import lombok.Setter;



import java.time.LocalDateTime;


@Getter
@Setter
public class UserCommunityResponseParam {
    private Long comIndex;
    private String comTitle;
    private LocalDateTime comCreatedAt;
    private int commentCount;
}