package com.ssafy.whitebox.ai.repository;

import com.ssafy.whitebox.ai.entity.AIResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.ssafy.whitebox.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface AIResultRepository extends JpaRepository<AIResult, Long> {
    Page<AIResult> findByUser(User user, Pageable pageable);
    // 추가 쿼리 메서드 정의 가능
    @Query("SELECT COUNT(vu) FROM AIResult vu WHERE vu.user = :user")
    int countByUser(@Param("user") User user);
}