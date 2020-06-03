package com.dhruv.product.services;

import com.dhruv.product.Util.ProductException;
import com.dhruv.product.model.Product;
import com.dhruv.product.repository.ProductRepository;
import com.google.common.base.Strings;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

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
        if (!StringUtils.isBlank(id)) {
            return repository.findById(id);
        } else {
            throw new ProductException(true, "No product id passed");
        }
    }

    @Override
    public Product save(Product product) throws ProductException {
        if (product != null) {
            product.setId(UUID.randomUUID().toString());
            return repository.save(product);
        } else {
            throw new ProductException(true, "No product info passed");
        }
    }

    @Override
    public Product update(Product product) throws ProductException {
        if (product != null) {
            Product updateProduct = repository.findById(product.getId()).orElseGet(null);
            if (updateProduct != null) {
               return repository.save(product);
            } else {
                throw new ProductException(true, "No product present, did you intent to update it ?");
            }
        } else {
            throw new ProductException(true, "No product info passed");
        }
    }

    @Override
    public boolean delete(String id) throws ProductException {
        if (!StringUtils.isBlank(id)) {
            if (repository.existsById(id)) {
                repository.deleteById(id);
                return true;
            }
        } else {
            throw new ProductException(true, "id not passed for delete or is null");
        }
        return false;
    }
}
