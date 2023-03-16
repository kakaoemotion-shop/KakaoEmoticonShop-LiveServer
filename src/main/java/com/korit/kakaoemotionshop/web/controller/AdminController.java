package com.korit.kakaoemotionshop.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @GetMapping("/emo")
    public String registerEmo() { return "admin/emo_register"; }

    @GetMapping("/search")
    public String searchEmo() { return "admin/emo_search"; }

    @GetMapping("/modify")
    public String modifyEmo() { return "admin/emo_modification"; }
}
