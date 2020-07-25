package com.dhruv.product.dao;

import java.util.List;

import com.dhruv.product.Util.ProductException;
import com.dhruv.product.model.Product;

public interface ProductDao {

    List<Product> findAll() throws ProductException;

    void save(Product baseProduct) throws ProductException;

    Product findById(Integer id) throws ProductException;

    void update(Product baseProduct) throws ProductException;

    void delete(Integer id) throws ProductException;


}
