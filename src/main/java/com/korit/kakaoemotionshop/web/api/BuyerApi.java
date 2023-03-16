package com.korit.kakaoemotionshop.web.api;

import com.korit.kakaoemotionshop.aop.annotation.ValidAspect;
import com.korit.kakaoemotionshop.entity.BuyerMst;
import com.korit.kakaoemotionshop.entity.UserMst;
import com.korit.kakaoemotionshop.security.PrincipalDetails;
import com.korit.kakaoemotionshop.service.AccountService;
import com.korit.kakaoemotionshop.service.BuyerService;
import com.korit.kakaoemotionshop.web.dto.CMRespDto;
import com.korit.kakaoemotionshop.web.dto.SearchEmoReqDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@Api(tags = {"Buyer API Controller"})
@RestController
@RequestMapping("/api/buyer")
public class BuyerApi {

    @Autowired
    private BuyerService buyerService;

    @ApiOperation(value = "구매등록", notes = "구매등록 요청 메소드")
    @PostMapping("/register")
    public ResponseEntity<? extends CMRespDto<? extends BuyerMst>> register(@RequestBody @Valid BuyerMst buyerMst) {


        BuyerMst buyer = buyerService.registerBuyer(buyerMst);

        return ResponseEntity
                .created(URI.create("/api/account/buyer/" + buyer.getBuyerId()))
                .body(new CMRespDto<>(HttpStatus.CREATED.value(), "Create a new Buyer", buyer));
    }


}