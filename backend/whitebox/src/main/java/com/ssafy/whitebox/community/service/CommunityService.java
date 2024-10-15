package com.ssafy.whitebox.community.service;

import com.ssafy.whitebox.community.entity.Community;
import com.ssafy.whitebox.community.entity.CommunityImage;
import com.ssafy.whitebox.community.repository.CommunityImageRepository;
import com.ssafy.whitebox.community.repository.CommunityRepository;
import com.ssafy.whitebox.common.service.FileStorageService;
import com.ssafy.whitebox.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.ssafy.whitebox.user.entity.User;
import com.ssafy.whitebox.community.dto.CommunityParam;
import com.ssafy.whitebox.community.dto.CommunityImageParam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import com.ssafy.whitebox.community.dto.CommunityCommentParam;
import com.ssafy.whitebox.community.entity.CommunityComment;
import com.ssafy.whitebox.community.repository.CommunityCommentRepository;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommunityService {

    private final CommunityRepository communityRepository;
    private final CommunityImageRepository communityImageRepository;
    private final FileStorageService fileStorageService;
    private final UserRepository userRepository;
    private final CommunityCommentRepository communityCommentRepository;


    // ID로 조회
    public CommunityParam findById(long id) {
        Community community = communityRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Not found"));
        community.setComHit(community.getComHit() + 1);
        communityRepository.save(community);
        return convertToParamWithComments(community);
    }



    // 엔티티를 DTO로 변환하는 메서드
    private CommunityParam convertToParam(Community community) {
        List<CommunityImageParam> imageParams = community.getImages().stream()
                .map(image -> new CommunityImageParam(image.getId(), image.getImageUrl(), image.getCreatedAt()))
                .collect(Collectors.toList());

        CommunityParam param = new CommunityParam();
        param.setComIndex(community.getComIndex());
        param.setComTitle(community.getComTitle());
        param.setComDescription(community.getComDescription());
        param.setComCreatedAt(community.getComCreatedAt());
        param.setComHit(community.getComHit());
        param.setComIsImage(community.getComIsImage());
        param.setImages(imageParams);
        param.setUserIndex(community.getUser().userIndex());
        param.setUserNickname(community.getUser().userNickname());
        param.setCommentCount(community.getComments().size());
        return param;
    }
    private CommunityParam convertToParamWithComments(Community community) {
        CommunityParam param = convertToParam(community);  // 기본 정보는 그대로 사용

        List<CommunityCommentParam> commentParams = community.getComments().stream()
                .map(comment -> {
                    CommunityCommentParam commentParam = new CommunityCommentParam();
                    commentParam.setId(comment.getId());
                    commentParam.setComment(comment.getComment());
                    commentParam.setUserType(comment.getUser().userType().getValue());
                    commentParam.setUserNickname(comment.getUser().userNickname());
                    commentParam.setPostedAt(comment.getPostedAt());
                    return commentParam;
                })
                .collect(Collectors.toList());
        param.setComments(commentParams);  // 댓글 추가
        return param;
    }
    public Community convertToEntity(CommunityParam param) {
        Community community = new Community();
        community.setComTitle(param.getComTitle());
        community.setComDescription(param.getComDescription());
        community.setComIsImage(param.isComIsImage());
        community.setComIndex(param.getComIndex());
        community.setComHit(param.getComHit());
        User user = userRepository.findById(param.getUserIndex()).orElseThrow(() -> new IllegalArgumentException("User가 없음"));
        community.setUser(user);
        community.setComCreatedAt(param.getComCreatedAt());
        if (param.getImages() != null) {
            List<CommunityImage> images = param.getImages().stream()
                    .map(imageParam -> convertImageToEntity(imageParam, community, user)) // CommunityImageParam을 CommunityImage로 변환
                    .collect(Collectors.toList());
            community.setImages(images);
        }
        return community;
    }

    // CommunityImageParam을 CommunityImage 엔티티로 변환하는 메서드
    private CommunityImage convertImageToEntity(CommunityImageParam imageParam, Community community, User user) {
        CommunityImage image = new CommunityImage();
        image.setId(imageParam.getId()); // DB에서의 기존 ID 사용
        image.setImageUrl(imageParam.getImageUrl());
        image.setCreatedAt(imageParam.getCreatedAt());
        image.setCommunity(community);
        image.setUser(user);
        return image;
    }

    // 게시물 생성 (이미지 여부 판단 및 저장)
    public Community createCommunity(Community community, List<MultipartFile> images, String userEmail) {
        User user = userRepository.findByUserEmail(userEmail);
        boolean hasImages = (images != null && !images.isEmpty());
        community.setComIsImage(hasImages);
        community.setComCreatedAt(LocalDateTime.now());
        community.setComHit(0);
        community.setUser(user);

        // 게시물 저장
        Community savedCommunity = communityRepository.save(community);
        // 이미지가 있을 경우 이미지 저장
        if (hasImages) {
            for (MultipartFile image : images) {
                try {

                    // FileStorageService를 사용하여 파일 저장
                    String savedFileName = fileStorageService.saveFile(image, "image");
                    CommunityImage communityImage = new CommunityImage();
                    communityImage.setCommunity(savedCommunity);
                    communityImage.setUser(user);
                    communityImage.setImagePath(savedFileName);  // 저장된 파일명 저장
                    communityImageRepository.save(communityImage);
                } catch (IOException e) {
                    throw new RuntimeException("Failed to store image", e);
                }
            }
        }

        return savedCommunity;
    }

    // 게시물 업데이트 및 삭제 로직은 기존대로 유지
    public Community save(CommunityParam community) {
        return communityRepository.save(convertToEntity(community));
    }

    public void deleteById(long id) {
        communityRepository.deleteById(id);
    }


    public Page<CommunityParam> getCommunitiesWithPagination(int pageIndex, int pageSize) {
        PageRequest pageRequest = PageRequest.of(pageIndex - 1, pageSize, Sort.by(Sort.Direction.DESC, "comCreatedAt"));
        Page<Community> communityPage = communityRepository.findAll(pageRequest);

        // Community 엔티티를 CommunityParam으로 변환하여 반환
        return communityPage.map(this::convertToParam); // Page<Community> -> Page<CommunityParam>
    }

    public long getTotalCommunityCount() {
        return communityRepository.count();
    }
    public void addComment(Long communityId, String userEmail, String commentText) {
        Community community = communityRepository.findById(communityId)
                .orElseThrow(() -> new IllegalArgumentException("Community not found"));
        User user = userRepository.findByUserEmail(userEmail);

        CommunityComment comment = new CommunityComment();
        comment.setCommunity(community);
        comment.setUser(user);
        comment.setComment(commentText);  // commentText -> comment로 수정
        comment.setPostedAt(LocalDateTime.now());

        communityCommentRepository.save(comment);
    }

    public void deleteComment(Long commentId) {
        communityCommentRepository.deleteById(commentId);
    }
    public boolean isCommentAuthor(Long commentId, String userEmail) {
        CommunityComment comment = communityCommentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));
        return comment.getUser().userEmail().equals(userEmail);
    }
}
