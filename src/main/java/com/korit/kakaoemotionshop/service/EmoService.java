package com.korit.kakaoemotionshop.service;

import com.korit.kakaoemotionshop.entity.EmoImage;
import com.korit.kakaoemotionshop.entity.EmoMst;
import com.korit.kakaoemotionshop.exception.CustomValidationException;
import com.korit.kakaoemotionshop.repository.EmoRepository;
import com.korit.kakaoemotionshop.web.dto.DeleteReqDto;
import com.korit.kakaoemotionshop.web.dto.EmoReqDto;
import com.korit.kakaoemotionshop.web.dto.SearchNumberListDto;
import com.korit.kakaoemotionshop.web.dto.SearchReqDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
public class EmoService {

    @Value("${file.path}")
    private String filePath;
    @Autowired
    private EmoRepository emoRepository;

//    public Map<String, Object> getEmoAndImage(String emoCode){
//        Map<String, Object> result = new HashMap<>();
//        result.put("emoMst", emoRepository.findEmoByEmoCode(emoCode));
//        result.put("emoImage", emoRepository.findEmoImageByEmoCode(emoCode));
//
//        return result;
//    }

    public List<EmoImage> getEmos(String emoCode) {
        return emoRepository.findEmoImageAll(emoCode);
    }

    public EmoMst getEmoByEmoCode(String emoCode) {
        return emoRepository.findEmoByEmoCode(emoCode);
    }
    public Map<String, Object> getEmoAndAllImage(String emoCode){
        Map<String, Object> resultAll = new HashMap<>();
        resultAll.put("emoMst", emoRepository.findEmoByEmoCode(emoCode));
        resultAll.put("emoImage", emoRepository.findEmoImageAll(emoCode));
        return resultAll;
    }

    public List<EmoMst> searchEmo(SearchReqDto searchReqDto){
        searchReqDto.setIndex();
        return emoRepository.searchEmo(searchReqDto);
    }

    public void registerEmo(EmoReqDto emoReqDto){
        duplicateEmoCode(emoReqDto.getEmoCode());
        emoRepository.saveEmo(emoReqDto);
    }

    private void duplicateEmoCode(String emoCode){
        EmoMst emoMst = emoRepository.findEmoByEmoCode(emoCode);
        if(emoMst != null){
            Map<String,String> errorMap = new HashMap<>();
            errorMap.put("emoCode","이미 존재하는 이모티콘코드입니다.");

            throw new CustomValidationException(errorMap);
        }
    }

    public void modifyEmo(EmoReqDto emoReqDto) {
        emoRepository.updateEmoByEmoCode(emoReqDto);
    }

    public void removeEmo(String emoCode) {
        emoRepository.deleteEmo(emoCode);
    }

    public void registerEmoImages(String emoCode, List<MultipartFile> files) {
        if(files.size()<1) {
            Map<String, String>  errorMap = new HashMap<String, String>();
            errorMap.put("files", "업로드할 이미지를 4개 선택해주세요");

            throw new CustomValidationException(errorMap);
        }
        List<EmoImage> emoImages = new ArrayList<>();

        files.forEach(file ->{
           String originFileName = file.getOriginalFilename();
           String extension = originFileName.substring(originFileName.lastIndexOf("."));
           String tempFileName = UUID.randomUUID().toString().replaceAll("-","")+extension;

           Path uploadPath = Paths.get(filePath+"emo/"+tempFileName);

           File f = new File(filePath + "emo");
           if(!f.exists()) {
               f.mkdirs();
           }
           try {
               Files.write(uploadPath, file.getBytes());
           } catch (IOException e) {
               throw new RuntimeException(e);
           }

           EmoImage emoImage = EmoImage.builder()
                   .emoCode(emoCode)
                   .saveName(tempFileName)
                   .originName(originFileName)
                   .build();

           emoImages.add(emoImage);
        });

        emoRepository.registerEmoImages(emoImages);
    }

//    public List<EmoImage> getEmos(String emoCode) {
//        return emoRepository.findEmoImageAll(emoCode);
//    }

    public void removeEmoImage(int imageId) {
        EmoImage emoImage = emoRepository.findEmoImageByImageId(imageId);

        if(emoImage == null) {
            Map<String,String> errorMap = new HashMap<String,String>();
            errorMap.put("error","존재하지 않는 imageId 입니다");

            throw  new CustomValidationException(errorMap);
        }

        if(emoRepository.deleteEmoImage(imageId) > 0 ) {
            File file = new File(filePath+"emo/"+emoImage.getSaveName());
            if(file.exists()) {
                file.delete();
            }
        }
    }

    public int getEmoTotalCount(SearchNumberListDto searchNumberListDto){
        return emoRepository.getEmoTotalCount(searchNumberListDto);
    }
    public void removeEmos(DeleteReqDto deleteReqDto){
        emoRepository.deleteEmos(deleteReqDto.getEmoId());
    }

}
