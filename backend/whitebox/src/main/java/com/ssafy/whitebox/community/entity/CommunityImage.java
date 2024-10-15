package com.ssafy.whitebox.community.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import com.ssafy.whitebox.user.entity.User;
@Entity
@Table(name = "community_image")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommunityImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long id;

    // N:1 관계, 커뮤니티 글에 대한 외래 키
    @ManyToOne
    @JoinColumn(name = "com_index", nullable = false)  // com_index를 외래 키로 설정
    @JsonBackReference
    private Community community;

    // N:1 관계, 이미지를 업로드한 사용자에 대한 외래 키
    @ManyToOne
    @JoinColumn(name = "user_index", nullable = false)  // user_index를 외래 키로 설정
    private User user;

    // 이미지 URL
    @Column(name = "com_image_url", nullable = false)
    private String imageUrl;

    // 이미지 생성 시간
    @Column(name = "com_img_created_at")
    private LocalDateTime createdAt;

    // 이미지 파일 경로 설정 메서드
    public void setImagePath(String savedFileName) {
        this.imageUrl = savedFileName;
        this.createdAt = LocalDateTime.now();  // 이미지 저장 시 생성 시간 자동으로 설정
    }
}
