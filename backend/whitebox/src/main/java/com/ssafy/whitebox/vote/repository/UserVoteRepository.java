package com.ssafy.whitebox.vote.repository;

import com.ssafy.whitebox.vote.entity.UserVote;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.whitebox.user.entity.User;
import com.ssafy.whitebox.vote.entity.Vote;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.Optional;

public interface UserVoteRepository extends JpaRepository<UserVote, Long> {

    Optional<UserVote> findByUserAndVote(User user, Vote vote);
    // 특정 Vote의 총 투표 수를 계산하는 메서드
    @Query("SELECT COUNT(uv) FROM UserVote uv WHERE uv.vote = :vote")
    int countByVote(@Param("vote") Vote vote);

    Page<UserVote> findByUser(User user, Pageable pageable);

    @Query("SELECT COUNT(uu) FROM UserVote uu WHERE uu.user = :user")
    int countByUser(@Param("user") User user);
}
