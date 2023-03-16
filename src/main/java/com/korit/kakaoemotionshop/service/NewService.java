package com.korit.kakaoemotionshop.service;

import com.korit.kakaoemotionshop.entity.HotEmo;
import com.korit.kakaoemotionshop.entity.NewEmo;
import com.korit.kakaoemotionshop.repository.HotRepository;
import com.korit.kakaoemotionshop.repository.NewRepository;
import com.korit.kakaoemotionshop.web.dto.SearchEmoReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class NewService {
    private final NewRepository newRepository;
    public List<NewEmo> getNewEmos(SearchEmoReqDto searchEmoReqDto) {
        searchEmoReqDto.setIndex();
        return newRepository.searchNewEmo(searchEmoReqDto);
    }
}
