package com.dhruv.product.services;

import java.util.List;

import com.dhruv.product.Util.ProductException;
import com.dhruv.product.model.Product;

public interface ProductService {

    List<Product> findAll() throws ProductException;

    void save(Product product) throws ProductException;

    Product findById(Integer id) throws ProductException;

    void update(Product product) throws ProductException;

    void delete(Integer id) throws ProductException;
}
