package com.ssafy.whitebox.vote.entity;

import com.ssafy.whitebox.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "VOTE_IMAGE")
public class VoteImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imageId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vote_id")
    @JsonBackReference
    private Vote vote;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_index")
    private User user;

    private String voImageUrl;
    private LocalDateTime voImageCreatedAt;
}
