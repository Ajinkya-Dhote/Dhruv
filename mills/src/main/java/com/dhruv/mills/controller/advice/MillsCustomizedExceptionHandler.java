package com.dhruv.mills.controller.advice;

import java.time.LocalDateTime;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.dhruv.mills.exception.ExceptionResponse;
import com.dhruv.mills.exception.MillNotFoundException;

/**
 * This class represents controller advice for customized exception handler
 * @author Vishwas
 *
 */
@RestController
@ControllerAdvice
public class MillsCustomizedExceptionHandler extends ResponseEntityExceptionHandler {
	
	
	@ExceptionHandler(Exception.class)
	public final ResponseEntity<Object> handleAllExceptions(MillNotFoundException ex, WebRequest request){
		ExceptionResponse exceptionResponse =  new ExceptionResponse(LocalDateTime.now(), ex.getMessage(),request.getDescription(false));
		return new ResponseEntity(exceptionResponse,HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(MillNotFoundException.class)
	public final ResponseEntity<Object> handleMillNotFoundExceptions(MillNotFoundException ex, WebRequest request){
		ExceptionResponse exceptionResponse =  new ExceptionResponse(LocalDateTime.now(), ex.getMessage(),request.getDescription(false));
		return new ResponseEntity(exceptionResponse,HttpStatus.NOT_FOUND);
	}
	
	protected ResponseEntity<Object> handleMethodArgumentNotValid(
			MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
		ExceptionResponse exceptionResponse = new ExceptionResponse(LocalDateTime.now(), "validation Failed", ex.getBindingResult().toString());

		return new ResponseEntity(exceptionResponse,HttpStatus.BAD_REQUEST);
	}

}
