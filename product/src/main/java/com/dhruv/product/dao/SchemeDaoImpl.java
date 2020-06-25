package com.dhruv.product.dao;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Repository;

import com.dhruv.product.Util.ProductException;
import com.dhruv.product.model.Scheme;

@Repository
public class SchemeDaoImpl extends BaseDaoImpl implements SchemeDao {
	private static final Logger LOGGER = LoggerFactory.getLogger(SchemeDaoImpl.class);
	
	@Override
	public List<Scheme> getAllSchemes() {
		try {
			return namedParamJdbcTemplate.query(this.getQuery("getAllSchemes"),
			        new BeanPropertyRowMapper<>(Scheme.class));
		} catch (DataAccessException | ProductException ex) {
			LOGGER.error("Error while fetching all schemes: ", ex);
			return Arrays.asList();
		}
		
	}

	@Override
	public List<Scheme> getAllSchemesForProduct(String productId) {
		try {
			MapSqlParameterSource params = new MapSqlParameterSource();
	        params.addValue("productId", productId);
			return namedParamJdbcTemplate.query(this.getQuery("getAllSchemesForProduct"),
			        params, new BeanPropertyRowMapper<>(Scheme.class));
		} catch (DataAccessException | ProductException ex) {
			LOGGER.error("Error while fetching all schemes for product: {}", productId, ex);
			return Arrays.asList();
		}
	}

	@Override
	public Integer createScheme(List<Scheme> schemes) {
		
		try {
			return saveProductScheme(schemes);
		} catch (DataAccessException | ProductException e) {
			LOGGER.error("Unable to create scheme: ", e);
			return null;
		}
		
	}
	
	private int saveProductScheme(List<Scheme> schemes) throws DataAccessException, ProductException {
    	
    	for (Scheme scheme: schemes) {
    		LOGGER.info("Savign product scheme: {}", scheme);
    		MapSqlParameterSource params = new MapSqlParameterSource();
    		params.addValue("id", UUID.randomUUID().toString());
    		params.addValue("productId", scheme.getProductId());
    		params.addValue("comparator", scheme.getComparator().toString());
    		params.addValue("discount", scheme.getDiscount());
    		params.addValue("x", scheme.getX());
    		params.addValue("y", scheme.getY());
    		
    		int result = namedParamJdbcTemplate.update(this.getQuery("insertProductScheme"), params);
            LOGGER.info("{} rows created in table with data: {}", result, params);
    	}
		return schemes.size();
    }
}
