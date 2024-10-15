package com.ssafy.whitebox.mypage.service;

import com.ssafy.whitebox.ai.dto.AIDetailResultResponseParam;
import com.ssafy.whitebox.ai.dto.AIResultResponseParam;
import com.ssafy.whitebox.ai.entity.AIResult;
import com.ssafy.whitebox.community.entity.Community;
import com.ssafy.whitebox.mypage.dto.UserCommunityResponseParam;
import com.ssafy.whitebox.mypage.dto.UserInfoResponseParam;
import com.ssafy.whitebox.mypage.dto.UserVoteResponseParam;
import com.ssafy.whitebox.user.entity.User;
import com.ssafy.whitebox.vote.entity.UserVote;
import com.ssafy.whitebox.vote.entity.Vote;
import com.ssafy.whitebox.vote.repository.VoteCommentRepository;
import org.springframework.data.domain.PageRequest;
import com.ssafy.whitebox.user.repository.UserRepository;
import com.ssafy.whitebox.ai.repository.AIResultRepository;
import com.ssafy.whitebox.vote.repository.UserVoteRepository;
import com.ssafy.whitebox.community.repository.CommunityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MyPageService {

    private final UserRepository userRepository;
    private final AIResultRepository aiResultRepository;
    private final CommunityRepository communityRepository;
    private final UserVoteRepository userVoteRepository;
    private final VoteCommentRepository voteCommentRepository;
    public UserInfoResponseParam getUserInfo(UserDetails userDetails) {
        // UserDetails에서 유저 이메일을 가져와 UserRepository를 통해 유저 정보 조회
        String email = userDetails.getUsername();
        User user = userRepository.findByUserEmail(email);

        // 조회된 유저 정보를 기반으로 DTO 생성 및 반환
        return UserInfoResponseParam.builder()
                .nickname(user.userNickname())
                .email(user.userEmail())
                .createdAt(user.userDate())
                .build();
    }
    // 개인 영상 확인
    public List<AIResultResponseParam> getUserVideos(UserDetails userDetails, int pageIndex) {
        User user = userRepository.findByUserEmail(userDetails.getUsername());

        PageRequest pageRequest = PageRequest.of(pageIndex - 1, 6, Sort.by(Sort.Direction.DESC, "createdAt")); // 페이지 당 10개씩
        List<AIResult> userVideos = aiResultRepository.findByUser(user, pageRequest).getContent();
        return userVideos.stream()
                .map(this::convertToAIResultResponseParam)
                .collect(Collectors.toList());
    }
    public AIDetailResultResponseParam getAIDetail(Long videoIndex){
        AIResult aiResult = aiResultRepository.findById(videoIndex).orElseThrow();
        Long voteIndex = (long) -1;
        if (aiResult.isUploaded()){
            voteIndex = aiResult.getVote().getVoteId();
        }
        AIDetailResultResponseParam response = AIDetailResultResponseParam.builder()
                .aiDescription(aiResult.getAiDescription())
                .aiExplanation(aiResult.getAiExplanation())
                .aiResult(aiResult.getAiResult())
                .aiRelatedLaw(aiResult.getAiRelatedLaw())
                .aiUserFault(aiResult.getAiUserFault())
                .aiOtherFault(aiResult.getAiOtherFault())
                .aiCreatedAt(aiResult.getCreatedAt())
                .aiVideoUrl(aiResult.getVideoUrl())
                .isUploaded(aiResult.isUploaded())
                .voteIndex(voteIndex)
                .build();
        return response;
    }
    // 개인 커뮤니티 리스트 확인
    public List<UserCommunityResponseParam> getUserCommunities(UserDetails userDetails, int pageIndex) {
        User user = userRepository.findByUserEmail(userDetails.getUsername());

        PageRequest pageRequest = PageRequest.of(pageIndex - 1, 5, Sort.by(Sort.Direction.DESC, "comCreatedAt"));
        List<Community> userCommunities = communityRepository.findByUser(user, pageRequest).getContent();
        return userCommunities.stream()
                .map(this::convertToCommunityParam)
                .collect(Collectors.toList());
    }

    // 개인 최근 투표 확인
    public List<UserVoteResponseParam> getUserVotes(UserDetails userDetails, int pageIndex) {
        User user = userRepository.findByUserEmail(userDetails.getUsername());

        PageRequest pageRequest = PageRequest.of(pageIndex - 1, 3, Sort.by(Sort.Direction.DESC, "id"));
        List<UserVote> userVotes = userVoteRepository.findByUser(user, pageRequest).getContent();
        return userVotes.stream()
                .map(this::convertToUserVoteResponseParam)
                .collect(Collectors.toList());
    }

    // AIResult를 AIResultResponseParam로 변환하는 메서드
    private AIResultResponseParam convertToAIResultResponseParam(AIResult aiResult) {
        return AIResultResponseParam.builder()
                .aiIndex(aiResult.getId())
                .thumbnail1(aiResult.getThumbnail1())
                .thumbnail2(aiResult.getThumbnail2())
                .thumbnail3(aiResult.getThumbnail3())
                .thumbnail4(aiResult.getThumbnail4())
                .isUploaded(aiResult.isUploaded())
                .createdAt(aiResult.getCreatedAt())
                .aiUserFault(aiResult.getAiUserFault())
                .aiOtherFault(aiResult.getAiOtherFault())
                .build();
    }

    // Community를 CommunityParam으로 변환하는 메서드
    private UserCommunityResponseParam convertToCommunityParam(Community community) {
        UserCommunityResponseParam param = new UserCommunityResponseParam();
        param.setComIndex(community.getComIndex());
        param.setComTitle(community.getComTitle());
        param.setComCreatedAt(community.getComCreatedAt());
        param.setCommentCount(community.getComments().size());
        return param;
    }

    // UserVote를 UserVoteResponseParam로 변환하는 메서드
    private UserVoteResponseParam convertToUserVoteResponseParam(UserVote userVote) {
        Vote vote = userVote.getVote();
        int commentCount = voteCommentRepository.countByVote(vote);
        int voteCount = userVoteRepository.countByVote(vote);
        int totalVotes = vote.getVoApprovalCnt() + vote.getVoOppositeCnt() + vote.getVoNeutralCnt();
        int approvalPercentage;
        int oppositePercentage;
        int neutralPercentage;
        if (totalVotes == 0) {
            approvalPercentage = 0;
            oppositePercentage = 0;
            neutralPercentage = 0;
        }
        else{
            approvalPercentage = (int) Math.round((vote.getVoApprovalCnt() / (double) totalVotes) * 100);
            oppositePercentage = (int) Math.round((vote.getVoOppositeCnt() / (double) totalVotes) * 100);
            neutralPercentage = (int) Math.round((vote.getVoNeutralCnt() / (double) totalVotes) * 100);
            int sum = approvalPercentage + oppositePercentage + neutralPercentage;
            if (sum != 100) {
                int difference = 100 - sum;
                // 가장 큰 값에 차이를 더해줌
                if (approvalPercentage >= oppositePercentage && approvalPercentage >= neutralPercentage) {
                    approvalPercentage += difference;
                } else if (oppositePercentage >= approvalPercentage && oppositePercentage >= neutralPercentage) {
                    oppositePercentage += difference;
                } else {
                    neutralPercentage += difference;
                }
            }
        }

        return UserVoteResponseParam.builder()
                .voteId(userVote.getVote().getVoteId())
                .recentVoteType(userVote.getRecentVoteType())
                .approvalPercent(approvalPercentage)
                .oppositePercent(oppositePercentage)
                .neutralPercent(neutralPercentage)
                .commentCount(commentCount)
                .voteCount(voteCount)
                .title(vote.getVoTitle())
                .build();
    }
}
