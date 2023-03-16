package com.korit.kakaoemotionshop.repository;

import com.korit.kakaoemotionshop.entity.EmoLike;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LikeRepository {

    public int addLike(EmoLike emoLike);
    public int deleteLike(EmoLike emoLike);
    public int getLikeStatus(EmoLike emoLike);

    public int getLikeCount(int emoId);

}
