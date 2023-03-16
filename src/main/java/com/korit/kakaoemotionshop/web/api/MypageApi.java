package com.korit.kakaoemotionshop.web.api;

import com.korit.kakaoemotionshop.security.PrincipalDetails;
import com.korit.kakaoemotionshop.service.HotService;
import com.korit.kakaoemotionshop.service.MypageService;
import com.korit.kakaoemotionshop.web.dto.CMRespDto;
import com.korit.kakaoemotionshop.web.dto.SearchEmoReqDto;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Api(tags = {"MyPage API Controller"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/mypage")
public class MypageApi {

    private final MypageService  mypageService;

    @GetMapping("/like")
    public ResponseEntity<CMRespDto<?>> getUerLike(SearchEmoReqDto searchEmoReqDto,
                                                   @AuthenticationPrincipal PrincipalDetails principalDetails) {
        if(principalDetails != null) {
            searchEmoReqDto.setUserId(principalDetails.getUser().getUserId());
        }

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(),
                        "Successfully", mypageService.getLikeEmos(searchEmoReqDto)));

    }
}
