package com.ssafy.whitebox.community.repository;

import com.ssafy.whitebox.community.entity.Community;
import com.ssafy.whitebox.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommunityRepository extends JpaRepository<Community, Long> {
    Page<Community> findAll(Pageable pageable);
    Page<Community> findByUser(User user, Pageable pageable);

    // 특정 Vote의 댓글 수를 계산하는 메서드
    @Query("SELECT COUNT(cu) FROM Community cu WHERE cu.user = :user")
    int countByUser(@Param("user") User user);

    @Query(value = "SELECT * FROM community c ORDER BY c.com_hit DESC LIMIT 10", nativeQuery = true)
    List<Community> findTop10Communities();


}
