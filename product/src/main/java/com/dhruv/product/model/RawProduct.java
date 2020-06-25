package com.dhruv.product.model;

import javax.persistence.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.ToString;

/**
 * 
 * @author ajinkya
 *
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RawProduct {

	@NonNull
	private String id;
	@NonNull
	private Double quantity;
	@NonNull
	private String name;
}
