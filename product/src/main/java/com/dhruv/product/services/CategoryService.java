package com.dhruv.product.services;

import java.util.List;

import com.dhruv.product.Util.ProductException;
import com.dhruv.product.model.Category;

public interface CategoryService {

    void save(Category category) throws ProductException;

    List<Category> findByProductId(Integer id) throws ProductException;

    void update(Category category) throws ProductException;

    void delete(Integer id) throws ProductException;

}
