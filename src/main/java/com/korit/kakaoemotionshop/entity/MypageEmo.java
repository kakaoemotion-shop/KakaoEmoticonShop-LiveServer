package com.korit.kakaoemotionshop.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class MypageEmo {

    private int emoId;
    private String emoCode;
    private String emoName;
    private String company;
    private String emoDate;
    private String saveName;
    private int likeId;
    private int likeCount;



}
