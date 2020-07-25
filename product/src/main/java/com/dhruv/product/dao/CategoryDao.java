package com.dhruv.product.dao;

import java.util.List;

import com.dhruv.product.Util.ProductException;
import com.dhruv.product.model.Category;

public interface CategoryDao {

    void save(Category category) throws ProductException;

    List<Category> findByProductId(Integer productId) throws ProductException;

    void update(Category category) throws ProductException;

    void delete(Integer id) throws ProductException;

}
