package com.korit.kakaoemotionshop.service;

import com.korit.kakaoemotionshop.entity.EmoImage;
import com.korit.kakaoemotionshop.repository.DetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DetailService {

    private final DetailRepository detailRepository;

    public Map<String, Object> getEmoAndAllImage(String emoCode){
        Map<String, Object> resultAll = new HashMap<>();
        resultAll.put("emoMst", detailRepository.findEmoByEmoCode(emoCode));
        resultAll.put("emoImage", detailRepository.findEmoImageAll(emoCode));
        return resultAll;
    }
    public List<EmoImage> getEmos(String emoCode) {
        return detailRepository.findEmoImageAll(emoCode);
    }

    public Map<String, Object> getEmoAndImageOne(String emoCode){
        Map<String, Object> resultAll = new HashMap<>();
        resultAll.put("emoMst", detailRepository.findEmoByEmoCode(emoCode));
        resultAll.put("emoImage", detailRepository.findEmoImageOne(emoCode));
        return resultAll;
    }
}