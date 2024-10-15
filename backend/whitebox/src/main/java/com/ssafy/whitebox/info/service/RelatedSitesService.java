package com.ssafy.whitebox.info.service;

import com.ssafy.whitebox.info.entity.RelatedSites;
import com.ssafy.whitebox.info.repository.RelatedSitesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class RelatedSitesService {

    private final RelatedSitesRepository relatedSitesRepository;

    public List<RelatedSites> getAllRelatedSites(){
        return relatedSitesRepository.findAll();
    }

}
