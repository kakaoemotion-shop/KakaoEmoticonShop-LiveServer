package com.korit.kakaoemotionshop.service;

import com.korit.kakaoemotionshop.entity.SearchEmo;
import com.korit.kakaoemotionshop.repository.SearchRepository;
import com.korit.kakaoemotionshop.web.dto.SearchEmoReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final SearchRepository searchRepository;

    public int getSearchTotalCount(SearchEmoReqDto searchEmoReqDto) {
        return searchRepository.getUserSearchEmoTotalCount(searchEmoReqDto);
    }

    public List<SearchEmo> getSearchEmos(SearchEmoReqDto searchEmoReqDto) {
        searchEmoReqDto.setIndex();
        return searchRepository.userSearchEmo(searchEmoReqDto);
    }
}