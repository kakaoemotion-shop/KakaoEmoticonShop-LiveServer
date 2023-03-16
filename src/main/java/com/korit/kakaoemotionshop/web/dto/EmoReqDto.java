package com.korit.kakaoemotionshop.web.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class EmoReqDto {

    @ApiModelProperty(value = "이모티콘 코드",example = "emo-000", required = true)
    @NotBlank
    private String emoCode;

    @ApiModelProperty(value = "이모티콘 이름",example = "춘식이", required = true)
    @NotBlank
    private String emoName;

    @ApiModelProperty(value = "회사명",example = "카카오", required = true)
    @NotBlank
    private String company;

    @ApiModelProperty(value = "출시일",example = "2023-02-19", required = true)
    @NotBlank
    private String emoDate;

}
