package com.korit.kakaoemotionshop.repository;

import com.korit.kakaoemotionshop.entity.SearchEmo;
import com.korit.kakaoemotionshop.web.dto.SearchEmoReqDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SearchRepository {

    public int getUserSearchEmoTotalCount(SearchEmoReqDto searchEmoReqDto);
    public List<SearchEmo> userSearchEmo(SearchEmoReqDto searchEmoReqDto);

}