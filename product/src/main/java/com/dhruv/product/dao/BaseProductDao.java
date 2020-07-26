package com.dhruv.product.dao;

import java.util.List;

import com.dhruv.product.Util.ProductException;
import com.dhruv.product.model.BaseProduct;

public interface BaseProductDao {

    List<BaseProduct> findAll() throws ProductException;

    void save(BaseProduct baseProduct) throws ProductException;

    BaseProduct findById(Integer id) throws ProductException;

    void update(BaseProduct baseProduct) throws ProductException;

    void delete(Integer id) throws ProductException;

}