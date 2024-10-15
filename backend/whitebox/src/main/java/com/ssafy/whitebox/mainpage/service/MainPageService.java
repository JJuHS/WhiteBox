package com.ssafy.whitebox.mainpage.service;

import com.ssafy.whitebox.community.entity.Community;
import com.ssafy.whitebox.mainpage.dto.MainPageCommunityResponseParam;
import com.ssafy.whitebox.vote.entity.Vote;
import com.ssafy.whitebox.vote.repository.VoteRepository;
import com.ssafy.whitebox.community.repository.CommunityRepository;
import com.ssafy.whitebox.mainpage.dto.MainPageVoteResponseParam;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MainPageService {

    private final VoteRepository voteRepository;
    private final CommunityRepository communityRepository;

    public List<MainPageVoteResponseParam> getTop6Votes() {
        LocalDateTime currentDate = LocalDateTime.now();
        List<Vote> topVotes = voteRepository.findTop6Votes(currentDate);

        return topVotes.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public List<MainPageCommunityResponseParam> getTop10Communities(){
        List<Community> topCommunities = communityRepository.findTop10Communities();

        return topCommunities.stream()
                .map(this::convertToResponseCommunity)
                .collect(Collectors.toList());
    }

    private MainPageCommunityResponseParam convertToResponseCommunity(Community community){
        return MainPageCommunityResponseParam.builder()
                .comId(community.getComIndex())
                .title(community.getComTitle())
                .hit(community.getComHit())
                .createdAt(community.getComCreatedAt())
                .build();
    }

    private MainPageVoteResponseParam convertToResponse(Vote vote) {
        return MainPageVoteResponseParam.builder()
                .voteId(vote.getVoteId())
                .title(vote.getVoTitle())
                .totalVotes(vote.getVoApprovalCnt() + vote.getVoOppositeCnt() + vote.getVoNeutralCnt())
                .expirationDate(vote.getVoExpirationDate())
                .thumbnail1(vote.getAiResult().getThumbnail1()) // 필요한 경우 썸네일 정보도 추가
                .build();
    }
}
