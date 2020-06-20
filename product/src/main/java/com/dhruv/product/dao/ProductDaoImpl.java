package com.dhruv.product.dao;

import com.dhruv.product.Util.ProductException;
import com.dhruv.product.model.Product;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class ProductDaoImpl extends BaseDaoImpl implements ProductDao {
    private static final Logger LOGGER = LoggerFactory.getLogger(ProductDaoImpl.class);
    @Override
    public List<Product> findAll() throws ProductException {
        return namedParamJdbcTemplate.query(this.getQuery("getAllProducts"),
                new BeanPropertyRowMapper<>(Product.class));
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
        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("name", product.getName());
        params.addValue("type", product.getType());
        params.addValue("description", product.getDescription());
        params.addValue("price", product.getPrice());
        params.addValue("available", product.isAvailable());

        int result = namedParamJdbcTemplate.update(this.getQuery("insertProduct"), params);
        LOGGER.info("{} rows created in table with data: {}", result, params);
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
