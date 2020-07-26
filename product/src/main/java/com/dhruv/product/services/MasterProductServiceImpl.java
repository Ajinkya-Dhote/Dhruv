package com.dhruv.product.services;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dhruv.product.Util.ProductException;
import com.dhruv.product.model.BaseProduct;
import com.dhruv.product.model.MasterProduct;
import com.dhruv.product.model.Product;

/**
 * 
 * @author ajinkya
 *
 */
@Service
public class MasterProductServiceImpl implements MasterProductService {
    private static final Logger LOGGER = LoggerFactory.getLogger(MasterProductServiceImpl.class);

    @Autowired
    private BaseProductService baseProductService;

    @Autowired
    private CategoryService categoryService;

    @Override
    public List<MasterProduct> process(List<Product> products) throws ProductException {
        List<MasterProduct> masterProducts = new ArrayList<>();
        products.stream().forEach(product -> masterProducts.add(process(product)));
        return masterProducts;
    }

    private BaseProduct getBaseProduct(Integer baseProductId) throws ProductException {
        List<BaseProduct> baseProducts = baseProductService.findAll();
        return baseProducts.stream()
                .filter(x -> x.getId() == baseProductId)
                .findFirst()
                .get();
    }

    @Override
    public MasterProduct process(Product product) {
        MasterProduct masterProduct = new MasterProduct(product);
        try {
            masterProduct.setBaseProduct(getBaseProduct(masterProduct.getBaseProductId()));
        } catch (ProductException b) {
            LOGGER.error("Unabele to set base product", b);
        }

        // Add category
        try {
            masterProduct.setCategories(categoryService.findByProductId(masterProduct.getId()));
        } catch (ProductException e) {
            LOGGER.error("Unabele to set categories", e);
        }
        return masterProduct;
    }

}
