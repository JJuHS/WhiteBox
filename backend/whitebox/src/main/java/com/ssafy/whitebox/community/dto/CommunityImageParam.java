package com.ssafy.whitebox.community.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
public class CommunityImageParam{
    private Long id;
    private String imageUrl;
    private LocalDateTime createdAt;

    public CommunityImageParam(Long id, String imageUrl, LocalDateTime createdAt){
        this.id = id;
        this.imageUrl =  imageUrl;
        this.createdAt = createdAt;
    }

}