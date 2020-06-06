package com.dhruv.product.services;

import com.dhruv.product.Util.ProductException;
import com.dhruv.product.dao.ProductDao;
import com.dhruv.product.model.Product;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {
    private static final Logger LOGGER = LoggerFactory.getLogger(ProductService.class);

    @Autowired
    private ProductDao productDao;


    @Override
    public List<Product> findAll() throws ProductException {
        return productDao.findAll();
    }

    @Override
    public Optional<Product> findById(Integer id) throws ProductException {
        if (id != null) {
            return productDao.findById(id);
        } else {
            throw new ProductException(true, "No product id passed");
        }
    }

    @Override
    public void save(Product product) throws ProductException {
        if (product != null) {
            productDao.save(product);
        } else {
            throw new ProductException(true, "No product info passed");
        }
    }

    @Override
    public boolean delete(Integer id) throws ProductException {
        if (id != null) {
            return productDao.deleteById(id);
        } else {
            LOGGER.error("id not passed for delete or is null, id which was passed: {}", id);
            return false;
        }
    }
}
