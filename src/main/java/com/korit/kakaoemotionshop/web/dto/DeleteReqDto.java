package com.korit.kakaoemotionshop.web.dto;

import lombok.Data;

import java.util.List;

@Data
public class DeleteReqDto {

    private List<Integer> emoId;
}
