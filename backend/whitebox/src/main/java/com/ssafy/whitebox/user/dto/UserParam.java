package com.ssafy.whitebox.user.dto;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.whitebox.user.entity.User;
import com.ssafy.whitebox.user.util.UserType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

// Getter, Setter, RequiredArgsConstructor, ToString, EqualsAndHashCode
@Getter
@RequiredArgsConstructor
@Setter(AccessLevel.NONE)
@Schema(description = "사용자 DTO")
public class UserParam {

    @Schema(description = "사용자 이메일")
    @JsonProperty("user_email")
    String userEmail;

    @Setter
    @Schema(description = "사용자 비밀번호")
    @JsonProperty("user_password")
    String userPassword;

    @Schema(description = "사용자 닉네임")
    @JsonProperty("user_nickname")
    String userNickname;

    @Schema(description = "사용자 타입")
    @JsonProperty("user_type")
    @Setter
    UserType userType;


    // 정적 Factory method
    public static UserParam from(User user) {
        UserParam userParam = new UserParam();
        userParam.userEmail = user.userEmail();
        userParam.userPassword = user.userPassword();
        userParam.userNickname = user.userNickname();
        userParam.userType = user.userType();

        return userParam;
    }


}

