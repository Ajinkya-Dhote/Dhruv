package com.dhruv.product.dao;

import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Repository;

import com.dhruv.product.Util.ProductException;
import com.dhruv.product.model.Product;

/**
 * 
 * @author ajinkya
 *
 */

@Repository
public class ProductDaoImpl extends BaseDaoImpl implements ProductDao {
    private static final Logger LOGGER = LoggerFactory.getLogger(ProductDaoImpl.class);

    @Override
    public List<Product> findAll() throws ProductException {
        LOGGER.debug("Getting all base-products");
        try {
            return namedParamJdbcTemplate.query(this.getQuery("getAllProduct"),
                    new BeanPropertyRowMapper<>(Product.class));
        } catch (DataAccessException | ProductException e) {
            LOGGER.error("Unable to find product", e);
            throw new ProductException(true, "Unable to find product");
        }
    }

    @Override
    public Product findById(Integer id) throws ProductException {
        LOGGER.debug("Getting products for id: {}", id);
        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("id", id);
        Product product = null;
        try {
            product = namedParamJdbcTemplate.queryForObject(this.getQuery("selectProductById"), params,
                    new BeanPropertyRowMapper<>(Product.class));
        } catch (DataAccessException | ProductException ex) {
            LOGGER.error("Unable to create base-product", ex);
        }
        return product;
    }

    @Override
    public void save(Product product) throws ProductException {
        LOGGER.debug("Creating base product");

        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("name", product.getName());
        params.addValue("image", product.getImage());
        params.addValue("dateFirstAvailable", LocalDateTime.now());
        params.addValue("available", product.isAvailable());
        params.addValue("description", product.getDescription());
        params.addValue("baseProductId", product.getBaseProductId());

        try {
            namedParamJdbcTemplate.update(this.getQuery("insertProduct"), params);
        } catch (DataAccessException | ProductException e) {
            LOGGER.error("Unable to create product", e);
            throw new ProductException(true, "Unable to create product");
        }
    }

    @Override
    public void update(Product product) throws ProductException {
        LOGGER.debug("Updating base product");

        Product existingProduct = findById(product.getId());

        if (existingProduct == null) {
            throw new ProductException(true, "Cannot update product");
        }

        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("id", product.getId());
        params.addValue("name", product.getName());
        params.addValue("image", product.getImage());
        params.addValue("dateFirstAvailable", LocalDateTime.now());
        params.addValue("available", product.isAvailable());
        params.addValue("description", product.getDescription());
        params.addValue("baseProductId", product.getBaseProductId());

        namedParamJdbcTemplate.update(this.getQuery("updateProduct"), params);
    }

    @Override
    public void delete(Integer id) throws ProductException {
        LOGGER.debug("Deleteing product for id: {}", id);

        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("id", id);

        try {
            int result = namedParamJdbcTemplate.update(this.getQuery("deleteProduct"), params);

            if (result > 0) {
                LOGGER.info("product with id: {} delete, #rows of rows deleted: {}", id, result);
            }
        } catch (DataAccessException | ProductException e) {
            throw new ProductException(true, "Unable to delete product");
        }
    }
}
