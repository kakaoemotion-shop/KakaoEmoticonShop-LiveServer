package com.korit.kakaoemotionshop.web.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@AllArgsConstructor
@Data
public class EmoImageModifyDto {
    private String emoCode;
    private List<Integer> imageSeqs;
    private List<MultipartFile> files;
}