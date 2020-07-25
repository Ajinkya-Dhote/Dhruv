package com.dhruv.product.dao;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Repository;

import com.dhruv.product.Util.ProductException;
import com.dhruv.product.model.Category;

/**
 * 
 * @author ajinkya
 *
 */

@Repository
public class CategoryDaoImpl extends BaseDaoImpl implements CategoryDao {
    private static final Logger LOGGER = LoggerFactory.getLogger(CategoryDaoImpl.class);

    @Override
    public void save(Category category) throws ProductException {
        LOGGER.debug("Creating category for product");

        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("productId", category.getProductId());
        params.addValue("unit", category.getUnit().name());
        params.addValue("quantity", category.getQuantity());
        params.addValue("price", category.getPrice());

        try {
            namedParamJdbcTemplate.update(this.getQuery("insertProductCategory"), params);
        } catch (DataAccessException | ProductException e) {
            LOGGER.error("Unable to create produc category", e);
            throw new ProductException(true, "Unable to create produc category");
        }
        
    }

    @Override
    public List<Category> findByProductId(Integer productId) throws ProductException {
        LOGGER.debug("Getting category for products for product-id: {}", productId);
        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("productId", productId);
        try {
            try {
                return namedParamJdbcTemplate.query(this.getQuery("getAllCategoryForProduct"), params,
                        new BeanPropertyRowMapper<>(Category.class));
            } catch (DataAccessException | ProductException e) {
                LOGGER.error("Unable to find category for product", e);
                throw new ProductException(true, "Unable to find category for product");
            }
        } catch (DataAccessException | ProductException ex) {
            LOGGER.error("Unable to find category for product", ex);
        }
        throw new ProductException(true, "No categoy present for product");

    }

    @Override
    public void update(Category category) throws ProductException {
        LOGGER.debug("Updating category for product");

        Category oldCategory = findById(category.getId());

        if (oldCategory == null) {
            throw new ProductException(true, "Cannot update product");
        }

        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("id", category.getId());
        params.addValue("productId", category.getProductId());
        params.addValue("unit", category.getUnit().name());
        params.addValue("quantity", category.getQuantity());
        params.addValue("price", category.getPrice());

        namedParamJdbcTemplate.update(this.getQuery("updateCategory"), params);
        
    }

    private Category findById(Integer id) {
        LOGGER.debug("Getting category for id: {}", id);
        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("id", id);
        Category category = null;
        try {
            category = namedParamJdbcTemplate.queryForObject(this.getQuery("selectCategoryById"), params,
                    new BeanPropertyRowMapper<>(Category.class));
        } catch (DataAccessException | ProductException ex) {
            LOGGER.error("Unable to create base-product", ex);
        }
        return category;
    }

    @Override
    public void delete(Integer id) throws ProductException {
        LOGGER.debug("Deleteing category for id: {}", id);

        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("id", id);

        try {
            int result = namedParamJdbcTemplate.update(this.getQuery("deleteCategory"), params);

            if (result > 0) {
                LOGGER.info("Category with id: {} delete, #rows of rows deleted: {}", id, result);
            }
        } catch (DataAccessException | ProductException e) {
            throw new ProductException(true, "Unable to delete product");
        }
    }
}
