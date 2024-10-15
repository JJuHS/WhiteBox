package com.ssafy.whitebox.community.entity;


import jakarta.persistence.*;
import java.time.LocalDateTime;
import com.ssafy.whitebox.user.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "community_comment")
public class CommunityComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "community_id")
    private Community community;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String comment;

    private LocalDateTime postedAt;
}
