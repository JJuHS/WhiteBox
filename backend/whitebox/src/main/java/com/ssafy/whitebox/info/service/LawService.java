package com.ssafy.whitebox.info.service;
import com.ssafy.whitebox.info.entity.AccidentLaw;
import com.ssafy.whitebox.info.entity.CrimeLaw;
import com.ssafy.whitebox.info.entity.Law;
import com.ssafy.whitebox.info.repository.AccidentLawRepository;
import com.ssafy.whitebox.info.repository.CrimeLawRepository;
import com.ssafy.whitebox.info.repository.LawRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LawService {
    private final LawRepository lawRepository;
    private final AccidentLawRepository accidentLawRepository;
    private  final CrimeLawRepository crimeLawRepository;

    public List<Law> getLawsByPage(int page) {
        return lawRepository.findByPageOrderByLawNumberAscSeqAsc(page);
    }

    public List<CrimeLaw> getCrimeLawsByPage(int page){
        return crimeLawRepository.findByPageOrderByLawNumberAscSeqAsc(page);
    }

    public List<AccidentLaw> getAccidentLawsByPage(int page){
        return accidentLawRepository.findByPageOrderByLawNumberAscSeqAsc(page);
    }

    public Map<String, Object> processLaws(List<? extends Law> laws) {
        Map<String, Object> response = new HashMap<>();

        // seq == 1 인 법의 날짜 정보를 response에 추가
        laws.stream()
                .filter(law -> law.seq() == 1)
                .findFirst()
                .ifPresent(law -> {
                    response.put("startDate", law.startDate());
                    response.put("announceDate", law.announceDate());
                });

        // 법 번호별로 그룹핑하고, 설명을 리스트로 저장
        Map<Integer, List<String>> groupedByLawNumber = laws.stream()
                .collect(Collectors.groupingBy(Law::lawNumber,
                        Collectors.mapping(Law::lawDescription, Collectors.toList())));

        for (Map.Entry<Integer, List<String>> entry : groupedByLawNumber.entrySet()) {
            Integer lawNumber = entry.getKey();
            List<String> descriptions = entry.getValue();

            response.put(String.valueOf(lawNumber), descriptions);
        }

        return response;
    }


    public Map<String, Object> processAccidentLaws(List<AccidentLaw> laws) {
        Map<String, Object> response = new HashMap<>();

        // AccidentLaw 전용 필드 및 로직 처리
        laws.stream()
                .filter(law -> law.seq() == 1)
                .findFirst()
                .ifPresent(law -> {
                    response.put("startDate", law.startDate());
                    response.put("announceDate", law.announceDate());
                });

        Map<Integer, List<String>> groupedByLawNumber = laws.stream()
                .collect(Collectors.groupingBy(AccidentLaw::lawNumber,
                        Collectors.mapping(AccidentLaw::lawDescription, Collectors.toList())));

        for (Map.Entry<Integer, List<String>> entry : groupedByLawNumber.entrySet()) {
            Integer lawNumber = entry.getKey();
            List<String> descriptions = entry.getValue();

            response.put(String.valueOf(lawNumber), descriptions);
        }

        return response;
    }

    public Map<String, Object> processCrimeLaws(List<CrimeLaw> laws) {
        Map<String, Object> response = new HashMap<>();

        // CrimeLaw 전용 필드 및 로직 처리
        laws.stream()
                .filter(law -> law.seq() == 1)
                .findFirst()
                .ifPresent(law -> {
                    response.put("startDate", law.startDate());
                    response.put("announceDate", law.announceDate());
                });

        Map<Integer, List<String>> groupedByLawNumber = laws.stream()
                .collect(Collectors.groupingBy(CrimeLaw::lawNumber,
                        Collectors.mapping(CrimeLaw::lawDescription, Collectors.toList())));

        for (Map.Entry<Integer, List<String>> entry : groupedByLawNumber.entrySet()) {
            Integer lawNumber = entry.getKey();
            List<String> descriptions = entry.getValue();

            response.put(String.valueOf(lawNumber), descriptions);
        }

        return response;
    }
}
