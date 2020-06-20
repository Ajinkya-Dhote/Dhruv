package com.dhruv.product.dao;

import com.dhruv.product.Util.ProductException;
import com.dhruv.product.model.Product;

import java.util.List;
import java.util.Optional;

public interface ProductDao {
    List<Product> findAll() throws ProductException;

    Optional<Product> findById(int id) throws ProductException;

    void save(Product product) throws ProductException;

    boolean deleteById(int id) throws ProductException;

    void update(Integer id, String name, Double price, Double quantity) throws ProductException;
}
