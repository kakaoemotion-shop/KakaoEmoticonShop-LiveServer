package com.korit.kakaoemotionshop.web.dto;

import lombok.Data;

@Data
public class BuyerReqDto {
    private int buyerId;
    private String username;
    private String name;
    private String email;
    private String emoName;
    private int buyDate;
}
