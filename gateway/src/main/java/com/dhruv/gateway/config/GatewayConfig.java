package com.dhruv.gateway.config;

import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.netflix.hystrix.EnableHystrix;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator appRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route(r -> r
                            .path("/api/product/**")
                            .uri("http://localhost:8084/")
                            .id("ProductService"))
                .build();
    }
}
