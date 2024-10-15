package com.ssafy.whitebox.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginRequest {

    @Schema(description = "사용자 이메일")
    private String user_email;
    @Schema(description = "사용자 비밀번호")
    private String user_password;

}