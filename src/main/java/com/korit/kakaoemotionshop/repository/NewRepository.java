package com.korit.kakaoemotionshop.repository;

import com.korit.kakaoemotionshop.entity.HotEmo;
import com.korit.kakaoemotionshop.entity.NewEmo;
import com.korit.kakaoemotionshop.web.dto.SearchEmoReqDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface NewRepository {
    public List<NewEmo> searchNewEmo(SearchEmoReqDto searchEmoReqDto);
}
