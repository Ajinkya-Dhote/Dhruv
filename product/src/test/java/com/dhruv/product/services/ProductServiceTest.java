package com.dhruv.product.services;

import com.dhruv.product.Util.ProductException;
import com.dhruv.product.model.Product;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    ProductService productService;

    @Test()
    void findAll() throws ProductException {

        List<Product> products = productService.findAll();
        Assertions.assertEquals(products.getClass(), LinkedList.class);

//        Assertions.assertThrows(ProductException.class, () -> {
//
//        });

    }

    @Test
    void findById() {
    }

    @Test
    void save() {
    }

    @Test
    void delete() {
    }

    @Test
    void update() {
    }
}