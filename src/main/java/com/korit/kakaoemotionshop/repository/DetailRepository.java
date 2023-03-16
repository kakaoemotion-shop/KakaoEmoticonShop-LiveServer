package com.korit.kakaoemotionshop.repository;

import com.korit.kakaoemotionshop.entity.EmoImage;
import com.korit.kakaoemotionshop.entity.EmoMst;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DetailRepository {
    public EmoMst findEmoByEmoCode(String emoCode);
    public List<EmoImage> findEmoImageAll(String emoCode);
    public List<EmoImage> findEmoImageOne(String emoCode);
}
