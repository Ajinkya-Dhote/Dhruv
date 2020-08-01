package com.dhruv.mills.exception;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * Class for Exception Message Response
 * 
 * @author Vishwas
 *
 */

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class ExceptionResponse {
	
	private LocalDateTime timestamp;
	private String message;
	private String details;

}
