package com.korit.kakaoemotionshop.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class NewEmo {

    private int emoId;
    private String emoCode;
    private String emoName;
    private String company;
    private String emoDate;
    private String saveName;
    private int likeId;
    private int likeCount;

    private String newImage1;
    private String newImage2;
    private String newImage3;
    private String newImage4;
}
