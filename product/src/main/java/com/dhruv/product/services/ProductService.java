package com.dhruv.product.services;

import com.dhruv.product.Util.ProductException;
import com.dhruv.product.model.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    List<Product> findAll() throws ProductException;

    Optional<Product> findById(String id) throws ProductException;

    void save(Product product) throws ProductException;

    boolean delete(Integer id) throws  ProductException;

    void update(String id, String name, Double price, Double quantity) throws ProductException;
}
