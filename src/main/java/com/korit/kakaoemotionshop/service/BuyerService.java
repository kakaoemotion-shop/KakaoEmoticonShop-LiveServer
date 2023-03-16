package com.korit.kakaoemotionshop.service;

import com.korit.kakaoemotionshop.entity.BuyerMst;
import com.korit.kakaoemotionshop.repository.BuyerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BuyerService {

    @Autowired
    private BuyerRepository buyerRepository;

    public BuyerMst registerBuyer(BuyerMst buyerMst) {
        buyerRepository.saveBuyer(buyerMst);
        return buyerMst;
    }

}
