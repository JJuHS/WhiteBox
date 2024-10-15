package com.ssafy.whitebox.user.service;

import com.ssafy.whitebox.user.dto.CustomUserDetails;
import com.ssafy.whitebox.user.entity.User;
import com.ssafy.whitebox.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;



@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    // 유저 조회 및 return
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("Username received: " + username); // 로그 추가

        User userData = userRepository.findByUserEmail(username);

        if (userData == null) {
            System.out.println("User not found for email: " + username);  // 로그 추가
            throw new UsernameNotFoundException("User not found with email: " + username);
        }

        return new CustomUserDetails(userData);
    }
}
