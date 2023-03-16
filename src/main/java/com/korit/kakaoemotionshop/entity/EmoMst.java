package com.korit.kakaoemotionshop.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmoMst {

    @ApiModelProperty(hidden = true)
    private int emoId;
    @ApiModelProperty(value = "이모티콘 코드", example = "emo-000")
    private String emoCode;
    @ApiModelProperty(value = "이모티콘 이름", example = "무지이모티콘")
    private String emoName;
    @ApiModelProperty(value = "회사명", example = "카카오")
    private String company;
    @ApiModelProperty(value = "출시일", example = "2023-02-18")
    private String emoDate;

    private EmoLike emoLike;
}
