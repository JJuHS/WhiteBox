package com.ssafy.whitebox.ai.dto;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class AIDetailResultResponseParam {
    private String aiDescription;
    private String aiExplanation;
    private String aiResult;
    private String aiRelatedLaw;
    private int aiUserFault;
    private int aiOtherFault;
    private LocalDateTime aiCreatedAt;
    private String aiVideoUrl;
    private boolean isUploaded;
    private Long voteIndex;
}
