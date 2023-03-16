package com.korit.kakaoemotionshop.web.api;

import com.korit.kakaoemotionshop.service.DetailService;
import com.korit.kakaoemotionshop.service.EmoService;
import com.korit.kakaoemotionshop.web.dto.CMRespDto;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Api(tags = {"DetailPage API"})
@RestController
@RequiredArgsConstructor
@RequestMapping("api/detail/")
public class DetailApi {

    private final DetailService detailService;

    @GetMapping("/emo/{emoCode}")
    public ResponseEntity<CMRespDto<Map<String, Object>>> getEmo(@PathVariable String emoCode){

        Map<String, Object> responseMap = new HashMap<>();

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", detailService.getEmoAndAllImage(emoCode)));
    }

    @GetMapping("/emo/image/{emoCode}")
    public ResponseEntity<CMRespDto<Map<String, Object>>> getEmoOne(@PathVariable String emoCode){

        Map<String, Object> responseMap = new HashMap<>();

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", detailService.getEmoAndImageOne(emoCode)));
    }
}
