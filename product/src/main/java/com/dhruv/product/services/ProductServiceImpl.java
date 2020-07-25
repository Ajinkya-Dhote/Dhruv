package com.dhruv.product.services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dhruv.product.Util.ProductException;
import com.dhruv.product.dao.ProductDao;
import com.dhruv.product.model.Product;

@Service
public class ProductServiceImpl implements ProductService {
    private static final Logger LOGGER = LoggerFactory.getLogger(ProductServiceImpl.class);
    
    @Autowired
    private ProductDao productDao;

    @Override
    public List<Product> findAll() throws ProductException {
        LOGGER.debug("Getting all products");
        return productDao.findAll();
    }
    
    @Override
    public Product findById(Integer id) throws ProductException {
        LOGGER.debug("Getting products for id: {}", id);
        return productDao.findById(id);
    }

    @Override
    public void save(Product product) throws ProductException {
        LOGGER.debug("Creating base product");
        productDao.save(product);
    }

    @Override
    public void update(Product product) throws ProductException {
        LOGGER.debug("Updating product");
        productDao.update(product);
    }

    @Override
    public void delete(Integer id) throws ProductException {
        LOGGER.debug("Deleteing product for id: {}", id);
        productDao.delete(id);
    }

}
