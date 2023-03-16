package com.korit.kakaoemotionshop.web.advice;

import com.korit.kakaoemotionshop.exception.CustomLikeException;
import com.korit.kakaoemotionshop.exception.CustomValidationException;
import com.korit.kakaoemotionshop.web.dto.CMRespDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionAdvice {

    @ExceptionHandler(CustomValidationException.class)
    public ResponseEntity<?> validationError(CustomValidationException e) {
        return ResponseEntity.badRequest().body(new CMRespDto<>(HttpStatus.BAD_REQUEST.value(),
                "Validation Error", e.getErrorMap()));
    }

    @ExceptionHandler(CustomLikeException.class)
    public ResponseEntity<?> LikeError(CustomLikeException e) {
        return ResponseEntity.
                badRequest().body(new CMRespDto<>(HttpStatus.BAD_REQUEST.value(),
                        "Like Error", e.getErrorMap()));
    }
}
