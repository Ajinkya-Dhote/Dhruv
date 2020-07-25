package com.dhruv.product.services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dhruv.product.Util.ProductException;
import com.dhruv.product.dao.BaseProductDao;
import com.dhruv.product.model.BaseProduct;

/**
 * 
 * @author ajinkya
 *
 */
@Service
public class BaseProductServiceImpl implements BaseProductService {
    private static final Logger LOGGER = LoggerFactory.getLogger(BaseProductService.class);

    @Autowired
    private BaseProductDao baseProductDao;

    @Override
    public List<BaseProduct> findAll() throws ProductException {
        LOGGER.debug("Getting all base-products");
        return baseProductDao.findAll();
    }

    @Override
    public BaseProduct findById(Integer id) throws ProductException {
        LOGGER.debug("Getting base-products for id: {}", id);
        return baseProductDao.findById(id);
    }

    @Override
    public void save(BaseProduct baseProduct) throws ProductException {
        LOGGER.debug("Creating base product");
        baseProductDao.save(baseProduct);
    }

    @Override
    public void update(BaseProduct baseProduct) throws ProductException {
        LOGGER.debug("Updating base product");
        baseProductDao.update(baseProduct);
    }

    @Override
    public void delete(Integer id) throws ProductException {
        LOGGER.debug("Deleteing base product for id: {}", id);
        baseProductDao.delete(id);
    }

}
