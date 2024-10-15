package com.ssafy.whitebox.user.controller;

import com.ssafy.whitebox.user.dto.UserParam;
import com.ssafy.whitebox.user.entity.User;
import com.ssafy.whitebox.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name="User", description = "사용자 관련 API 명세")
@RestController
@RequestMapping("api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @Operation(summary = "사용자 회원가입 API")
    @ApiResponse(
            responseCode = "200",
            description = "사용자 회원가입 완료"
    )
    @PostMapping
    public ResponseEntity<UserParam> register(@RequestBody UserParam userParam) throws IllegalAccessException {
        User newUser = userService.register(userParam);
        UserParam response = UserParam.from(newUser)    ;
        return ResponseEntity.ok(response);
    }
}
