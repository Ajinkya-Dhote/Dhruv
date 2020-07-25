package com.dhruv.product.services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Service;

import com.dhruv.product.Util.ProductException;
import com.dhruv.product.dao.CategoryDao;
import com.dhruv.product.model.BaseProduct;
import com.dhruv.product.model.Category;

/**
 * 
 * @author ajinkya
 *
 */

@Service
public class CatregoryServiceImplmpl implements CategoryService {

    private static final Logger LOGGER = LoggerFactory.getLogger(CatregoryServiceImplmpl.class);

    @Autowired
    private CategoryDao categoryDao;

    @Override
    public void save(Category category) throws ProductException {
        LOGGER.debug("creating category: {}", category);
        categoryDao.save(category);
        
    }

    @Override
    public List<Category> findByProductId(Integer productId) throws ProductException {
        LOGGER.debug("Getting base-products for id: {}", productId);
        return categoryDao.findByProductId(productId);
    }

    @Override
    public void update(Category category) throws ProductException {
        LOGGER.debug("Updating base product");
        categoryDao.update(category);
    }

    @Override
    public void delete(Integer id) throws ProductException {
        LOGGER.debug("Deleteing base product for id: {}", id);
        categoryDao.delete(id);
    }

}
