package com.dhruv.product.services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.dhruv.product.Util.ProductException;
import com.dhruv.product.dao.RawProductDao;
import com.dhruv.product.model.RawProduct;

/**
 * 
 * @author ajinkya
 *
 */
@Service
public class RawProductServiceImpl implements RawProductService {
	private static final Logger LOGGER = LoggerFactory.getLogger(RawProductServiceImpl.class);
	
	@Autowired
	RawProductDao productDao;

	/**
	 * Create entry for new products
	 * @param {@link RawProduct}
	 * @throws ProductException 
	 * @throws DataAccessException 
	 */
	@Override
	public void create(RawProduct rawProduct) throws DataAccessException, ProductException {
		LOGGER.debug("Creating raw product: {}", rawProduct);
		productDao.create(rawProduct);
	}

	/**
	 * Get List of all products
	 * @return List of {@link RawProduct}
	 */
	@Override
	public List<RawProduct> getAll() {
		LOGGER.debug("Gettign list of all raw products");
		return productDao.getAll();
	}

	/**
	 * Get Raw product by id
	 * @throws ProductException 
	 * @throws DataAccessException 
	 */
	@Override
	public RawProduct getbyId(String id) throws DataAccessException, ProductException {
		LOGGER.debug("Gettign raw product by id");
		return productDao.getbyId(id);
	}

}
