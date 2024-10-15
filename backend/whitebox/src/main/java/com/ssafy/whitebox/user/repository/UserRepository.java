package com.ssafy.whitebox.user.repository;

import com.ssafy.whitebox.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;



public interface UserRepository extends JpaRepository<User, Long> {

    User findByUserEmail(String userEmail);

    boolean existsByUserNickname(String userNickname);

    boolean existsByUserEmail(String userEmail);
}
