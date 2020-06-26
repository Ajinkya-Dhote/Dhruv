package com.dhruv.product.dao;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Repository;

import com.dhruv.product.Util.ProductException;
import com.dhruv.product.model.Product;
import com.dhruv.product.model.RawProduct;

/**
 * 
 * @author ajinkya
 *
 */
@Repository
public class RawProductDaoImpl extends BaseDaoImpl implements RawProductDao {
	private static final Logger LOGGER = LoggerFactory.getLogger(RawProductDaoImpl.class);
	

	@Override
	public void create(RawProduct rawProduct) throws DataAccessException, ProductException {
		LOGGER.info("Savign raw product: {}", rawProduct);
		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("id", UUID.randomUUID().toString());
		params.addValue("name", rawProduct.getName());
		params.addValue("quantity", rawProduct.getQuantity());
		
		int result = namedParamJdbcTemplate.update(this.getQuery("insertRawProduct"), params);
        LOGGER.info("{} rows created in table with data: {}", result, params);
		
	}

	@Override
	public List<RawProduct> getAll() {
		try {
			return namedParamJdbcTemplate.query(this.getQuery("getAllRawProducts"),
			        new BeanPropertyRowMapper<>(RawProduct.class));
		} catch (DataAccessException | ProductException e) {
			LOGGER.error("Error while finding raw product", e);
			return Arrays.asList();
		}		
	}

	@Override
	public RawProduct getbyId(String id) throws DataAccessException, ProductException {
		 MapSqlParameterSource params = new MapSqlParameterSource();
	        params.addValue("id", id);
	        Product product = null;
	        try {
	            product = namedParamJdbcTemplate.queryForObject(this.getQuery("selectRawProductById"),
	                    params, new BeanPropertyRowMapper<>(Product.class));
	        } catch (EmptyResultDataAccessException ex) {
	            LOGGER.warn("No product present for id: {}. returning empty result", id);
	        }
	        return null;
	}

	@Override
	public boolean deleteById(String id) throws DataAccessException, ProductException {
		MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("id", id);

        int result  = namedParamJdbcTemplate.update(this.getQuery("deleteRawProduct"), params);

        if (result > 0) {
            LOGGER.info("product with id: {} delete, #rows of rows deleted: {}", id, result);
            return true;
        } else {
            LOGGER.info("No rows deleted");
            return false;
        }
	}

}
