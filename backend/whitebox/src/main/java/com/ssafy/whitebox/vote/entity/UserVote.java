package com.ssafy.whitebox.vote.entity;

import lombok.Getter;
import lombok.Setter;
import com.ssafy.whitebox.user.entity.User;
import jakarta.persistence.*;

@Entity
@Getter
@Setter
public class UserVote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_index", nullable = false)
    private User user; // 유저와의 연관 관계


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vote_index", nullable = false)
    private Vote vote; // 투표 게시판과의 연관 관계

    @Column(nullable = false)
    private int recentVoteType; // 최근 투표 타입 (1: 찬성, 2: 반대, 3: 중립, 4: 투표하지 않음)
}
