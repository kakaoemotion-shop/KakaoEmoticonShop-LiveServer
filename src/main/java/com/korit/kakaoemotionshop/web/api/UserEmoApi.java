package com.korit.kakaoemotionshop.web.api;

import com.korit.kakaoemotionshop.service.EmoService;
import com.korit.kakaoemotionshop.web.dto.CMRespDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserEmoApi {

    private final EmoService emoService;

    @GetMapping("/emo/{emoCode}")
    public ResponseEntity<CMRespDto<?>> getEmoByEmoCode(@PathVariable String emoCode) {
        return ResponseEntity.ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", emoService.getEmoByEmoCode(emoCode)));
    }
}
