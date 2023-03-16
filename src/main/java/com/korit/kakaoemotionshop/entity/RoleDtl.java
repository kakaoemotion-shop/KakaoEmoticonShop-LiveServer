package com.korit.kakaoemotionshop.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RoleDtl {
    private int roleDtlId;

    private int userId;
    private int roleId;

    private LocalDateTime createDate;
    private LocalDateTime updateDate;

    private RoleMst roleMst;
}
