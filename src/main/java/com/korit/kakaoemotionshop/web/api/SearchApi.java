package com.korit.kakaoemotionshop.web.api;

import com.korit.kakaoemotionshop.aop.annotation.ParamsAspect;
import com.korit.kakaoemotionshop.security.PrincipalDetails;
import com.korit.kakaoemotionshop.service.SearchService;
import com.korit.kakaoemotionshop.web.dto.CMRespDto;
import com.korit.kakaoemotionshop.web.dto.SearchEmoReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class SearchApi {

    private final SearchService searchService;

    @GetMapping("/search")
    public ResponseEntity<CMRespDto<?>> search(SearchEmoReqDto searchEmoReqDto,
                                               @AuthenticationPrincipal PrincipalDetails principalDetails) {
        if(principalDetails != null) {
            searchEmoReqDto.setUserId(principalDetails.getUser().getUserId());
        }

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", searchService.getSearchEmos(searchEmoReqDto)));
    }

    @ParamsAspect
    @GetMapping("/search/totalcount")
    public ResponseEntity<CMRespDto<Integer>> getSearchEmoTotalCount(SearchEmoReqDto searchEmoReqDto) {
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(),
                        "Successfully",
                        searchService.getSearchTotalCount(searchEmoReqDto)));
    }

}