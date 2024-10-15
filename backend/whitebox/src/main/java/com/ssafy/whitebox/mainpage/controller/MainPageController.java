package com.ssafy.whitebox.mainpage.controller;

import com.ssafy.whitebox.mainpage.dto.MainPageCommunityResponseParam;
import com.ssafy.whitebox.mainpage.dto.MainPageVoteResponseParam;
import com.ssafy.whitebox.mainpage.service.MainPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.HashMap;

@RestController
@RequestMapping("/api/v1/mainpage")
@RequiredArgsConstructor
public class MainPageController {

    private final MainPageService mainPageService;

    @GetMapping("/top-votes")
    public ResponseEntity<HashMap<String, Object>> getTopVotes() {
        List<MainPageVoteResponseParam> topVotes = mainPageService.getTop6Votes();
        List<MainPageCommunityResponseParam> topCommunities = mainPageService.getTop10Communities();
        HashMap<String, Object> response = new HashMap<>();
        response.put("votes", topVotes);
        response.put("communities", topCommunities);
        return ResponseEntity.ok(response);
    }
}
