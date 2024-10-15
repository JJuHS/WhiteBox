package com.ssafy.whitebox.ai.dto;

import lombok.Data;

@Data
public class AIAnalysisResult {
    private String aiDescription;
    private String aiExplanation;
    private String aiResult;
    private String aiRelatedLaw;
    private int aiUserFault;
    private int aiOtherFault;
}
