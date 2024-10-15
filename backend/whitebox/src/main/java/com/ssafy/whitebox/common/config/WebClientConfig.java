package com.ssafy.whitebox.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Value("${fastapi.server.url}")
    private String fastapiUrl;

    @Bean
    public WebClient webClient() {
        return WebClient.builder()
                .baseUrl(fastapiUrl) // FastAPI URL 설정
                .build();
    }
}