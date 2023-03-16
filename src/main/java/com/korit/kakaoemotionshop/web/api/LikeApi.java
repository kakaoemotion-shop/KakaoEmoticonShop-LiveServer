package com.korit.kakaoemotionshop.web.api;

import com.korit.kakaoemotionshop.entity.EmoLike;
import com.korit.kakaoemotionshop.security.PrincipalDetails;
import com.korit.kakaoemotionshop.service.LikeService;
import com.korit.kakaoemotionshop.web.dto.CMRespDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class LikeApi {

    @Autowired
    private LikeService likeService;

    @GetMapping("/like/{emoId}/status")
    public ResponseEntity<CMRespDto<Integer>> getLikeStatus(@PathVariable int emoId,
                                                            @AuthenticationPrincipal PrincipalDetails principalDetails) {

        int likeStatus = likeService.getLikeStatus(emoId, principalDetails.getUser().getUserId());

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully",likeStatus));
    }

    @PostMapping("/emo/{emoId}/like")
    public ResponseEntity<CMRespDto<Integer>> like(@PathVariable int emoId,
                                             @AuthenticationPrincipal PrincipalDetails principalDetails){
        int likeCount = likeService.like(emoId, principalDetails.getUser().getUserId());
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully",likeCount));
    }

    @DeleteMapping("/emo/{emoId}/like")
    public ResponseEntity<CMRespDto<Integer>> dislike(@PathVariable int emoId,
                                             @AuthenticationPrincipal PrincipalDetails principalDetails){
        int likeCount = likeService.dislike(emoId, principalDetails.getUser().getUserId());
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully",likeCount));
    }

}
