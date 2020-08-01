package com.dhruv.mills.service.model;


import javax.persistence.CascadeType;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Class represents Mill Model
 * 
 * @author Vishwas
 *
 */

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "mill")
public class Mill{
	
	@Id
	@GeneratedValue(strategy= GenerationType.SEQUENCE)
	private int id;
	private String millName;
	private String ownerFirstName;
	private String ownerLastName;
	private long contactNo;
	private String email;
	private int numberOfMachine;
	private int noOfWorkers;
	/*
	 * @Embedded private Images image;
	 */
	@Embedded
	private Address address;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "bank_id")
	private Bank bank;
	 
	

}
