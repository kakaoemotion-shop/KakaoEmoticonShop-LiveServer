package com.korit.kakaoemotionshop.service;

import com.korit.kakaoemotionshop.entity.HotEmo;
import com.korit.kakaoemotionshop.repository.HotRepository;
import com.korit.kakaoemotionshop.web.dto.SearchEmoReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HotService {

    private final HotRepository hotRepository;
    public List<HotEmo> getHotEmos(SearchEmoReqDto searchEmoReqDto) {
        searchEmoReqDto.setIndex();
        return hotRepository.searchHotEmo(searchEmoReqDto);
    }

}
