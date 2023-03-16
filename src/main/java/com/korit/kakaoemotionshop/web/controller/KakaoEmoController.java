package com.korit.kakaoemotionshop.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/main")
public class KakaoEmoController {

    @GetMapping("/new")
    public String newEmoticon() {
        return "kakaopage/new";
    }

    @GetMapping("/hot")
    public String hot() {
        return "kakaopage/hot";
    }

    @GetMapping("/detail")
    public String detailpage() {
        return "kakaopage/detailpage";
    }
}
