package com.korit.kakaoemotionshop.repository;

import com.korit.kakaoemotionshop.entity.UserMst;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccountRepository {

    public UserMst findUserByUserId(int userId);
    public UserMst findUserByUsername(String username);
    public int saveUser(UserMst user);
    public int saveRole(UserMst user);

    public int setUserProvider(UserMst user);
}
