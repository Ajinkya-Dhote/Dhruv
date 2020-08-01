package com.dhruv.mills.service.model;

import java.math.BigDecimal;

import javax.persistence.Embeddable;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * Class represents complete address of Mill with geographical location.
 * 
 * @author Vishwas
 *
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Embeddable
public class Address {

	private String addressLine1;
	private String addressLine2;
	private String addressLine3;
	private String city;
	private String state;
	private String pinCode;
	private String area;
	private String landmark;
	/**
	 * for geographical location
	 */
	private BigDecimal longitude;
	private BigDecimal latitude;

}
