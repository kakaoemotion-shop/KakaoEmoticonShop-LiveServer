package com.korit.kakaoemotionshop.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmoLike {
    @ApiModelProperty(value = "like_id",example = "1")
    private int likeId;
    @ApiModelProperty(value = "emo_id",example = "1")
    private int emoId;
    @ApiModelProperty(value = "user_id",example = "1")
    private int userId;
}
