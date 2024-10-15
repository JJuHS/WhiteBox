package com.ssafy.whitebox.ai.service;

import com.ssafy.whitebox.ai.entity.Lawyer;
import com.ssafy.whitebox.ai.repository.LawyerRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Date;

@Service
public class LawyerService {

    private final LawyerRepository lawyerRepository;
    private final WebClient webClient;

    public LawyerService(LawyerRepository lawyerRepository) {
        this.lawyerRepository = lawyerRepository;
        this.webClient = WebClient.builder().baseUrl("http://localhost:8000").build(); // Python 서버의 base URL 설정
    }

    public Lawyer findLawyerByNameAndDate(String name, Date date) {
        return lawyerRepository.findByLawyerNameAndLawyerDate(name, date);
    }
}
