package com.korit.kakaoemotionshop.web.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class SearchEmoReqDto {
    private int page;
    private String searchValue;
    private int count;
    private int userId;

    @ApiModelProperty(hidden = true)
    private int index;

    public void setIndex() {
        index = (page - 1) * count;
    }
}