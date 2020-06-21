package com.dhruv.product.dao;

import com.dhruv.product.Util.ProductException;
import com.dhruv.product.model.Product;
import com.dhruv.product.model.Scheme;
import com.dhruv.product.model.Unit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class ProductDaoImpl extends BaseDaoImpl implements ProductDao {
    private static final Logger LOGGER = LoggerFactory.getLogger(ProductDaoImpl.class);
    @Override
    public List<Product> findAll() throws ProductException {
    	LOGGER.info("products- gettting frm db");
    	try {
    		List<Product> products =  namedParamJdbcTemplate.query(this.getQuery("getAllProducts"),
                    new BeanPropertyRowMapper<>(Product.class));
        	LOGGER.info("products: {}", products);
        	products.forEach(p -> {
        		try {
        			MapSqlParameterSource params = new MapSqlParameterSource();
        	        params.addValue("productId", p.getId());
					List<Scheme> schemes = namedParamJdbcTemplate.query(this.getQuery("getAllSchemesForProducts"),
							params, new BeanPropertyRowMapper<>(Scheme.class));
					p.setScheme(schemes.toArray(new Scheme[0]));
				} catch (DataAccessException | ProductException e) {
					LOGGER.error("Error while fetching pschemes for roducts: {}", e);
				}
        	});
        	return products;
    	} catch(Exception ex) {
    		LOGGER.error("Error while fetching products: {}", ex);
    	}
    	return Arrays.asList();
    }

    @Override
    public Optional<Product> findById(int id) throws ProductException {
        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("id", id);
        Product product = null;
        try {
            product = namedParamJdbcTemplate.queryForObject(this.getQuery("selectProductById"),
                    params, new BeanPropertyRowMapper<>(Product.class));
        } catch (EmptyResultDataAccessException ex) {
            LOGGER.warn("No product present for id: {}. returning empty result", id);
        }
        return Optional.ofNullable(product);

    }

    @Override
    public void save(Product product) throws ProductException {
    	String productId = UUID.randomUUID().toString();
        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("id", productId);
        params.addValue("name", product.getName());
        params.addValue("image", product.getImage());
        params.addValue("baseQuantity", product.getBaseQuantity());
        params.addValue("baseQuantityUnit", product.getBaseQuantityUnit().toString());
        params.addValue("baseQuantityPrice", product.getBaseQuantityPrice());
        params.addValue("minQuantity", product.getMinQuantity());
        params.addValue("maxQuantity", product.getMaxQuantity());
        params.addValue("steps", product.getSteps());
        params.addValue("type", product.getType());
        params.addValue("description", product.getDescription());
        params.addValue("available", product.isAvailable());

        int result = namedParamJdbcTemplate.update(this.getQuery("insertProduct"), params);
        LOGGER.info("{} rows created in table with data: {}", result, params);
        
        saveProductScheme(productId, product.getScheme());
    }
    
    private void saveProductScheme(String productId, Scheme ...schemes) throws DataAccessException, ProductException {
    	LOGGER.debug("Savign product scheme");
    	for (Scheme scheme: schemes) {
    		MapSqlParameterSource params = new MapSqlParameterSource();
    		params.addValue("id", UUID.randomUUID().toString());
    		params.addValue("productId", productId);
    		params.addValue("comparator", scheme.getComparator());
    		params.addValue("discount", scheme.getDiscount());
    		params.addValue("x", scheme.getX());
    		params.addValue("y", scheme.getY());
    		
    		int result = namedParamJdbcTemplate.update(this.getQuery("insertProductScheme"), params);
            LOGGER.info("{} rows created in table with data: {}", result, params);
    	}
    }

    @Override
    public boolean deleteById(int id) throws ProductException {
        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("id", id);

        int result  = namedParamJdbcTemplate.update(this.getQuery("deleteProduct"), params);

        if (result > 0) {
            LOGGER.info("product with id: {} delete, #rows of rows deleted: {}", id, result);
            return true;
        } else {
            LOGGER.info("No rows deleted");
            return false;
        }

    }

    @Override
    public void update(Integer id, String name, Double price, Double quantity) throws ProductException {
        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("id", id);
        params.addValue("name", name);
        params.addValue("price", price);
        params.addValue("quantity", quantity);

        int result = namedParamJdbcTemplate.update(this.getQuery("updateProduct"), params);
        int resultq = namedParamJdbcTemplate.update(this.getQuery("updateProductquantity"), params);
        LOGGER.info("{} rows created in table with data: {}", result, params);
    }
}
