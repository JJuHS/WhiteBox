package com.ssafy.whitebox.ai.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class AIResultResponseParam {
    private Long aiIndex;
    private String thumbnail1;
    private String thumbnail2;
    private String thumbnail3;
    private String thumbnail4;
    private boolean isUploaded;
    private LocalDateTime createdAt;
    private int aiUserFault;
    private int aiOtherFault;
}
