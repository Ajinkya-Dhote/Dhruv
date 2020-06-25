package com.dhruv.product.dao;

import java.util.List;

import org.springframework.dao.DataAccessException;

import com.dhruv.product.Util.ProductException;
import com.dhruv.product.model.RawProduct;

/**
 * 
 * @author ajinkya
 *
 */
public interface RawProductDao {

	void create(RawProduct rawProduct) throws DataAccessException, ProductException;

	List<RawProduct> getAll();

}
