package com.ssafy.whitebox.auth.filter;

import com.ssafy.whitebox.auth.util.JWTUtil;
import com.ssafy.whitebox.user.dto.CustomUserDetails;
import com.ssafy.whitebox.user.entity.User;
import com.ssafy.whitebox.user.util.UserType;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JWTFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JWTFilter.class);

    private static final String BEARER_PREFIX = "Bearer ";
    private static final String DEFAULT_PASSWORD = "temp";
    private static final String DEFAULT_NICKNAME = "temp_user";

    private final JWTUtil jwtUtil;

    public JWTFilter(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorization = request.getHeader("Authorization");

        if (!isTokenPresent(authorization)) {
            logger.info("토큰이 없습니다");
            filterChain.doFilter(request, response);
            return;
        }

        String token = extractToken(authorization);

        if (jwtUtil.isExpired(token)) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            setAuthentication(token);
            filterChain.doFilter(request, response);
        } catch (IllegalArgumentException e) {
            logger.error("Invalid role found in token: {}", jwtUtil.getRole(token), e);
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "없는 역활!");
        }
    }

    private boolean isTokenPresent(String authorization) {
        return authorization != null && authorization.startsWith(BEARER_PREFIX);
    }

    private String extractToken(String authorization) {
        return authorization.substring(BEARER_PREFIX.length());
    }

    private void setAuthentication(String token) {
        String username = jwtUtil.getUsername(token);
        String role = jwtUtil.getRole(token);

        // 역할 매핑
        role = changeDefaultRole(role);

        UserType userType = UserType.valueOf(role.toUpperCase());

        User user = createUser(username, userType);

        CustomUserDetails customUserDetails = new CustomUserDetails(user);
        Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authToken);
    }

    private String changeDefaultRole(String role) {
        if (role.equalsIgnoreCase("USER")) {
            return "MEMBER";
        }
        return role;
    }

    private User createUser(String username, UserType userType) {
        User user = new User();
        user.userEmail(username);
        user.userPassword(DEFAULT_PASSWORD); // 임시 비밀번호
        user.userNickname(DEFAULT_NICKNAME); // 임시 닉네임
        user.userType(userType);
        return user;
    }
}
