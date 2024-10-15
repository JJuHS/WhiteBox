package com.ssafy.whitebox.info.controller;

import com.ssafy.whitebox.info.dto.LawParam;
import com.ssafy.whitebox.info.entity.*;
import com.ssafy.whitebox.info.service.LawService;
import com.ssafy.whitebox.info.service.RelatedSitesService;
import com.ssafy.whitebox.info.service.TermsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Tag(name="RelatedSites", description = "법률 관련 정보 API 명세")
@RestController
@RequestMapping("api/v1/board")
@RequiredArgsConstructor
public class InformationController {

    private final RelatedSitesService relatedSitesService;
    private final TermsService termsService;
    private final LawService lawService;

    @Operation(summary = "법률 정보 사이트 제공 API")
    @ApiResponse(
            responseCode = "200",
            description = "법률 정보 사이트 제공 완료"
    )
    @GetMapping("/related-sites")
    public ResponseEntity<List<RelatedSites>> getAllRelatedSites() {
        List<RelatedSites> relatedSites = relatedSitesService.getAllRelatedSites();
        return new ResponseEntity<>(relatedSites, HttpStatus.OK);
    }

    @Operation(summary = "법률 용어 제공 API")
    @ApiResponse(
            responseCode = "200",
            description = "법률 용어 제공 완료"
    )
    @GetMapping("/terms")
    public ResponseEntity<List<Terms>> getAllTerms(){
        List<Terms> terms = termsService.getAllRelatedSites();
        return new ResponseEntity<>(terms, HttpStatus.OK);
    }

    @Operation(summary = "법 변화 제공 API", description = "특정 페이지의 법 변화 데이터를 제공합니다.")
    @ApiResponse(
            responseCode = "200",
            description = "법 변화 완료"
    )
    @GetMapping("/law/{pageIndex}")
    public ResponseEntity<Map<String, Object>> getLawsByPage(
            @Parameter(name="pageIndex",description = "법 데이터의 페이지 인덱스", required = true)
            @PathVariable(name = "pageIndex")  int pageIndex) {

        List<Law> laws = lawService.getLawsByPage(pageIndex);
        if (laws.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Map<String, Object> response = lawService.processLaws(laws);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    ////////////////////////////

    @Operation(summary = "교통사고 처리 특례법 변화 제공 API", description = "특정 페이지의 법 변화 데이터를 제공합니다.")
    @ApiResponse(
            responseCode = "200",
            description = "교통 사고 처리 특례법 변화 완료"
    )
    @GetMapping("/accident-law/{pageIndex}")
    public ResponseEntity<Map<String, Object>> getAccidentLawsByPage(
            @Parameter(name="pageIndex",description = "법 데이터의 페이지 인덱스", required = true)
            @PathVariable(name = "pageIndex")  int pageIndex) {

        List<AccidentLaw> laws = lawService.getAccidentLawsByPage(pageIndex);
        if (laws.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Map<String, Object> response = lawService.processAccidentLaws(laws);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    ////////////////////////////

    @Operation(summary = "특정범죄 가중처벌법 변화 제공 API", description = "특정 페이지의 특정범죄 가중처벌법 변화 데이터를 제공합니다.")
    @ApiResponse(
            responseCode = "200",
            description = "특정범죄 가중처벌법 변화 완료"
    )
    @GetMapping("/crime-law/{pageIndex}")
    public ResponseEntity<Map<String, Object>> getCrimeLawsByPage(
            @Parameter(name="pageIndex",description = "법 데이터의 페이지 인덱스", required = true)
            @PathVariable(name = "pageIndex")  int pageIndex) {

        List<CrimeLaw> laws = lawService.getCrimeLawsByPage(pageIndex);
        if (laws.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Map<String, Object> response = lawService.processCrimeLaws(laws);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
