package com.dhruv.product.services;

import java.util.Arrays;
import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dhruv.product.dao.SchemeDao;
import com.dhruv.product.model.Scheme;

@Service
public class SchemeServiceImpl implements SchemeService{
	private static final Logger LOGGER = LoggerFactory.getLogger(SchemeServiceImpl.class);
	
	@Autowired
	SchemeDao schemeDao;

	@Override
	public List<Scheme> getAllSchemes() {
		return schemeDao.getAllSchemes();
		
	}

	@Override
	public List<Scheme> getAllSchemesForProduct(String productId) {
		if (productId != null && !productId.isEmpty()) {
			return schemeDao.getAllSchemesForProduct(productId);
		} else {
			LOGGER.error("Invalid product-id: {} passed to fetch schemes", productId);
			return Arrays.asList();
		}
		
	}

	@Override
	public Integer createScheme(List<Scheme> schemes) {
		if (schemes != null) {
			return schemeDao.createScheme(schemes);
		} else {
			return null;
		}
		
	}
}
