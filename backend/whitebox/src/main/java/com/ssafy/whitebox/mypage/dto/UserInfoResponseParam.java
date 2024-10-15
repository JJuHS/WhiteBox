package com.ssafy.whitebox.mypage.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class UserInfoResponseParam {
    private String nickname;
    private String email;
    private LocalDateTime createdAt;
}