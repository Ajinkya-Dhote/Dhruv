package com.dhruv.product.dao;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Repository;

import com.dhruv.product.Util.ProductException;
import com.dhruv.product.model.BaseProduct;

/**
 * 
 * @author ajinkya
 *
 */
@Repository
public class BaseProductDaoImpl extends BaseDaoImpl implements BaseProductDao {
    private static final Logger LOGGER = LoggerFactory.getLogger(BaseProductDaoImpl.class);

    @Override
    public List<BaseProduct> findAll() throws ProductException {
        LOGGER.debug("Getting all base-products");
        try {
            return namedParamJdbcTemplate.query(this.getQuery("getAllBaseProduct"),
                    new BeanPropertyRowMapper<>(BaseProduct.class));
        } catch (DataAccessException | ProductException e) {
            LOGGER.error("Unable to find base-product", e);
            throw new ProductException(true, "Unable to find base-product");
        }
    }

    @Override
    public BaseProduct findById(Integer id) throws ProductException {
        LOGGER.debug("Getting base-products for id: {}", id);
        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("id", id);
        BaseProduct product = null;
        try {
            product = namedParamJdbcTemplate.queryForObject(this.getQuery("selectBaseProductById"), params,
                    new BeanPropertyRowMapper<>(BaseProduct.class));
        } catch (DataAccessException | ProductException ex) {
            LOGGER.error("Unable to create base-product", ex);
        }
        return product;

    }

    @Override
    public void save(BaseProduct baseProduct) throws ProductException {
        LOGGER.debug("Creating base product");

        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("name", baseProduct.getName());

        try {
            namedParamJdbcTemplate.update(this.getQuery("insertBaseProduct"), params);
        } catch (DataAccessException | ProductException e) {
            LOGGER.error("Unable to create base-product", e);
            throw new ProductException(true, "Unable to create base-product");
        }
    }

    @Override
    public void update(BaseProduct baseProduct) throws ProductException {
        LOGGER.debug("Updating base product");

        BaseProduct product = findById(baseProduct.getId());

        if (product == null) {
            throw new ProductException(true, "Cannot update product");
        }

        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("id", baseProduct.getId());
        params.addValue("name", baseProduct.getName());

        namedParamJdbcTemplate.update(this.getQuery("updateBaseProduct"), params);

    }

    @Override
    public void delete(Integer id) throws ProductException {
        LOGGER.debug("Deleteing base product for id: {}", id);

        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("id", id);

        try {
            int result = namedParamJdbcTemplate.update(this.getQuery("deleteBaseProduct"), params);

            if (result > 0) {
                LOGGER.info("base-product with id: {} delete, #rows of rows deleted: {}", id, result);
            }
        } catch (DataAccessException | ProductException e) {
            throw new ProductException(true, "Unable to delete product");
        }
    }
}
