package com.ssafy.whitebox.user.service;
import com.ssafy.whitebox.user.dto.UserParam;
import com.ssafy.whitebox.user.entity.User;
import com.ssafy.whitebox.user.repository.UserRepository;
import com.ssafy.whitebox.user.util.UserType;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@RequiredArgsConstructor
@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional(readOnly = true)
    public boolean existsByUserEmail(String userEmail) {
        return userRepository.existsByUserEmail(userEmail);
    }

    @Transactional(readOnly = true)
    boolean existsByUserNickname(String userNickname) {
        return userRepository.existsByUserNickname(userNickname);
    }

    // 회원가입
    public User register(UserParam userParam) throws IllegalAccessException {

        if(userRepository.existsByUserNickname(userParam.getUserNickname())){
            throw new IllegalAccessException("이미 존재하는 닉네임입니다.");
        }

        if(userRepository.existsByUserEmail(userParam.getUserEmail())){
            throw new IllegalAccessException(("이미 존재하는 이메일입니다."));
        }

        User newUser = new User(
                userParam.getUserEmail(),
                bCryptPasswordEncoder.encode(userParam.getUserPassword()),
                userParam.getUserNickname(),
                UserType.MEMBER
        );

        return userRepository.save(newUser);
    }

    // 로그인 시 필요 정보 제공
    public User getUserByEmail(String userEmail){
        return userRepository.findByUserEmail(userEmail);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }
}
