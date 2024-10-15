package com.ssafy.whitebox.info.service;

import com.ssafy.whitebox.info.entity.RelatedSites;
import com.ssafy.whitebox.info.entity.Terms;
import com.ssafy.whitebox.info.repository.TermsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class TermsService {

    private final TermsRepository termsRepository;

    public List<Terms> getAllRelatedSites(){
        return termsRepository.findAll();
    }
}
