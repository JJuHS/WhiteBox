package com.ssafy.whitebox.vote.dto;
import lombok.*;

@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoteCreateResponseParam {
    private Long voteId;
    private String message;
}
