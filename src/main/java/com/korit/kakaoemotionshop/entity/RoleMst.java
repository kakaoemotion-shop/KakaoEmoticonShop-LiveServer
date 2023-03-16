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
public class RoleMst {
    private int roleId;
    private String roleName;

    private LocalDateTime createDate;
    private LocalDateTime updateDate;
}