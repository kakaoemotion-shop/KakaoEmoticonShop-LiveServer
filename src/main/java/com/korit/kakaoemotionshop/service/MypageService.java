package com.korit.kakaoemotionshop.service;

import com.korit.kakaoemotionshop.entity.HotEmo;
import com.korit.kakaoemotionshop.entity.MypageEmo;
import com.korit.kakaoemotionshop.repository.MypageRepository;
import com.korit.kakaoemotionshop.web.dto.SearchEmoReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MypageService {

    private final MypageRepository mypageRepository;

    public List<MypageEmo> getLikeEmos(SearchEmoReqDto searchEmoReqDto) {
        searchEmoReqDto.setIndex();
        return mypageRepository.userLikeEmo(searchEmoReqDto);
    }

}
