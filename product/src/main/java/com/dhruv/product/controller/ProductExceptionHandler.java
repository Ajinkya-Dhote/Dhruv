package com.dhruv.product.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.dhruv.product.Util.ProductException;

@ControllerAdvice
public class ProductExceptionHandler {
	
	@ExceptionHandler
	public ResponseEntity<String> exceptionHandler(ProductException px) {
		return new ResponseEntity<>(px.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
