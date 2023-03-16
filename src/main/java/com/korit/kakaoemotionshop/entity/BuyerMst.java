package com.korit.kakaoemotionshop.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BuyerMst {

    @ApiModelProperty(hidden = true)
    private int buyerId;
    private String username;
    private String name;
    private String email;
    private String emoName;

    @ApiModelProperty(hidden = true)
    private LocalDateTime buyDate;
}
