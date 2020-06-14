package com.dhruv.product.model;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.Column;
import java.util.Date;

@Data
public class Stock {
    private Integer id;

    @Column(name ="product_id")
    private Integer productId;
    private Double quantity;

    @CreatedDate
    @Column(name ="last_updated")
    private Date lastUpdated;
}
