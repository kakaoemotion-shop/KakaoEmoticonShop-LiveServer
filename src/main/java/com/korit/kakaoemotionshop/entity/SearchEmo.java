package com.korit.kakaoemotionshop.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchEmo {
    private int emoId;
    private String emoCode;
    private String emoName;
    private String company;
    private String saveName;

    private int imageId;
    private int imageSeq;
}