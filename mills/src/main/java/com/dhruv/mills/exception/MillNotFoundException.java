package com.dhruv.mills.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.AllArgsConstructor;

/**
 * Customised exception class for handling MillNotFoundException
 * @author Vishwas
 *
 */
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class MillNotFoundException extends Exception {
	
	public MillNotFoundException(String message) {
		super(message);
	}

	
}
