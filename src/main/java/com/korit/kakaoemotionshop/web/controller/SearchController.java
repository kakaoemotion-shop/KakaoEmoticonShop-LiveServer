package com.korit.kakaoemotionshop.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/search")
public class SearchController {

    @GetMapping("")
    public String loadSearch() {
        return "kakaopage/main_search";
    }
}
