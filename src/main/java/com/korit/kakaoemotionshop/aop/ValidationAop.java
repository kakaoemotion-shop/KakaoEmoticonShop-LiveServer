package com.korit.kakaoemotionshop.aop;

import com.korit.kakaoemotionshop.exception.CustomValidationException;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.validation.BeanPropertyBindingResult;

import java.util.HashMap;
import java.util.Map;

@Aspect
@Component
public class ValidationAop {

    @Pointcut("@annotation(com.korit.kakaoemotionshop.aop.annotation.ValidAspect)")
    private void pointCut() {}

    @Around("pointCut()")
    public Object around(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {

        Object[] args = proceedingJoinPoint.getArgs();

        System.out.println("AOP 작동");

        BeanPropertyBindingResult bindingResult = null;

        for(Object arg : args) {
            if(arg.getClass() == BeanPropertyBindingResult.class) {
                bindingResult = (BeanPropertyBindingResult) arg;
            }
        }

        if(bindingResult.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();

            bindingResult.getFieldErrors().forEach(error -> {
                errorMap.put(error.getField(), error.getDefaultMessage());
            });

            throw new CustomValidationException(errorMap);
        }

        return proceedingJoinPoint.proceed();
    }

}
