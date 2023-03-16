package com.korit.kakaoemotionshop.repository;

import com.korit.kakaoemotionshop.entity.BuyerMst;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BuyerRepository {

    public int saveBuyer(BuyerMst buyerMst);
}
