package com.dhruv.product.services;

import java.util.List;


import com.dhruv.product.model.Scheme;

public interface SchemeService {

	List<Scheme> getAllSchemes();
	
	List<Scheme> getAllSchemesForProduct(String productId);

	Integer createScheme(List<Scheme> scheme);

}
