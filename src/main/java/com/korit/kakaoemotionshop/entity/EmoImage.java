package com.korit.kakaoemotionshop.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmoImage {
    private int imageId;
    private int imageSeq;
    private String emoCode;
    private String saveName;
    private String originName;

    private int emoId;
    private int likeId;
}
