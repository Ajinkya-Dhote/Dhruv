package com.dhruv.product.services;

import com.dhruv.product.Util.ProductException;
import com.dhruv.product.model.Category;
import com.dhruv.product.model.Product;
import com.dhruv.product.repository.ProductRepository;

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
    private ProductRepository repository;


    @Override
    public List<Product> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Product> findById(String id) throws ProductException {
        if (id != null && !id.isEmpty()) {
//            return productDao.findById(id);
        	return null;
        } else {
            throw new ProductException(true, "No product id passed");
        }
    }

    @Override
    public Product save(Product product) throws ProductException {
        if (product != null) {
        	return repository.save(product);
        } else {
            throw new ProductException(true, "No product info passed");
        }
    }

    @Override
    public boolean delete(Integer id) throws ProductException {
        if (id != null) {
//            productDao.deleteById(id);
            return true;
        } else {
            LOGGER.error("id not passed for delete or is null, id which was passed: {}", id);
            return false;
        }
    }

    @Override
    public void update(String id, String name, Double price, Double quantity) throws ProductException {
//        productDao.update(id, name, price, quantity);
    }
}
