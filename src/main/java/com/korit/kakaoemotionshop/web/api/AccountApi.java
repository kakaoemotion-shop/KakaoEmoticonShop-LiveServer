package com.korit.kakaoemotionshop.web.api;

import com.korit.kakaoemotionshop.aop.annotation.ValidAspect;
import com.korit.kakaoemotionshop.entity.UserMst;
import com.korit.kakaoemotionshop.security.PrincipalDetails;
import com.korit.kakaoemotionshop.service.AccountService;
import com.korit.kakaoemotionshop.web.dto.CMRespDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@Slf4j
@Api(tags = {"Account Rest API Controller"})
@RestController
@RequestMapping("/api/account")
public class AccountApi {

    @Autowired
    private AccountService accountService;

    @ApiOperation(value = "회원가입", notes = "회원가입 요청 메소드")
    @ValidAspect
    @PostMapping("/register")
    public ResponseEntity<? extends CMRespDto<? extends UserMst>> register(@RequestBody @Valid UserMst userMst,
                                                                           BindingResult bindingResult) {

        accountService.duplicateUsername(userMst.getUsername());
        accountService.compareToPassword(userMst.getPassword(), userMst.getRepassword());

        UserMst user = accountService.registerUser(userMst);

        return ResponseEntity
                .created(URI.create("/api/account/user/" + user.getUserId()))
                .body(new CMRespDto<>(HttpStatus.CREATED.value(), "Create a new User", user));
    }

    @ApiOperation(value = "Get Principal", notes = "로그인된 사용자 정보 가져오기")
    @GetMapping("/principal")
    public ResponseEntity<CMRespDto<? extends PrincipalDetails>> getPrincipalDetails(@ApiParam(name = "principalDetails", hidden = true) @AuthenticationPrincipal PrincipalDetails principalDetails) {
        if(principalDetails != null) {
            principalDetails.getAuthorities().forEach(role -> {
                log.info("로그인된 사용자의 권한: {}", role.getAuthority());
            });
        }

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Success", principalDetails));
    }
}
