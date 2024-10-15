package com.ssafy.whitebox.auth.controller;
import com.ssafy.whitebox.auth.dto.LoginRequest;
import com.ssafy.whitebox.auth.exception.InvalidCredentialsException;
import com.ssafy.whitebox.auth.util.JWTUtil;
import com.ssafy.whitebox.common.exception.ServerErrorException;
import com.ssafy.whitebox.user.entity.User;
import com.ssafy.whitebox.user.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Tag(name="Login", description = "로그인 관련 API 명세")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class LoginController {

    private static final long TOKEN_VALIDITY = 43_200_000L;

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;
    private final UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticateUser(loginRequest.getUser_email(), loginRequest.getUser_password());

            // JWT 생성 및 응답 구성
            String token = createJwtToken(authentication);
            User user = userService.getUserByEmail(loginRequest.getUser_email());
            Map<String, Object> response = buildResponse(token, user);
            
            // header token 제공
            return ResponseEntity.ok()
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                    .body(response);

        } catch (AuthenticationException e) {
            logger.error("유저 인증 실패: {}", loginRequest.getUser_email(), e);
            throw new InvalidCredentialsException("유저 인증 실패");
        } catch (Exception e) {
            logger.error("이유 모를 에러 발생", e);
            throw new ServerErrorException("이유 모를 에러 발생");
        }
    }

    private Authentication authenticateUser(String email, String password) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(email, password);
        return authenticationManager.authenticate(authenticationToken);
    }

    private String createJwtToken(Authentication authentication) {
        return jwtUtil.createJwt(authentication.getName(), "MEMBER", TOKEN_VALIDITY);
    }

    private Map<String, Object> buildResponse(String token, User user) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "로그인 성공");
        response.put("userNickname", user.userNickname());
        response.put("userType", user.userType().getValue());
        response.put("registrationDate", user.userDate());
        return response;
    }
}
