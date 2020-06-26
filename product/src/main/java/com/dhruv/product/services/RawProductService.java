package com.dhruv.product.services;

import java.util.List;

import org.springframework.dao.DataAccessException;

import com.dhruv.product.Util.ProductException;
import com.dhruv.product.model.RawProduct;

/**
 * 
 * @author ajinkya
 *
 */
public interface RawProductService {

	void create(RawProduct rawProduct) throws DataAccessException, ProductException;

	List<RawProduct> getAll();

	RawProduct getbyId(String id) throws DataAccessException, ProductException;

	boolean deleteById(String id) throws DataAccessException, ProductException;

}
