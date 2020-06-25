package com.dhruv.product.dao;

import java.util.List;

import com.dhruv.product.model.Scheme;

public interface SchemeDao {

	List<Scheme> getAllSchemes();

	List<Scheme> getAllSchemesForProduct(String productId);
	
	Integer createScheme(List<Scheme>scheme);

}
