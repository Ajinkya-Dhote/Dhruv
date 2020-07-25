package com.dhruv.product.dao;

import com.dhruv.product.Util.ProductException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

import java.sql.Connection;

/**
 * 
 * @author ajinkya
 *
 */
@Component
@PropertySource("classpath:/sql.properties")
public class BaseDaoImpl {
    private static final Logger LOGGER = LoggerFactory.getLogger(BaseDaoImpl.class);

    @Autowired
    Environment environment;

    @Autowired
    protected JdbcTemplate jdbcTemplate;

    @Autowired
    protected NamedParameterJdbcTemplate namedParamJdbcTemplate;

    public Connection getConnection() throws ProductException {
        LOGGER.debug("getConnection()");
        try {
            return this.jdbcTemplate.getDataSource().getConnection();
        } catch (Exception e) {
            LOGGER.error("System could not connect to database. Error while getting connection. ", e);
            throw new ProductException(true, "System could not connect to database.");
        }
    }

    public void releaseConnection(Connection connection) {
        LOGGER.debug("releaseConnection()");
        if (connection != null) {
            try {
                connection.close();
            } catch (Exception e) {
                LOGGER.error("error while closing connection. ", e);
            }
        }
    }

    public JdbcTemplate getJdbcTemplate() {
        return jdbcTemplate;
    }

    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public NamedParameterJdbcTemplate getNamedParamJdbcTemplate() {
        return namedParamJdbcTemplate;
    }

    public void setNamedParamJdbcTemplate(NamedParameterJdbcTemplate namedParamJdbcTemplate) {
        this.namedParamJdbcTemplate = namedParamJdbcTemplate;
    }

    public String getQuery(String key) throws ProductException {
        final String query = this.environment.getProperty(key);
        if (query == null) {
            throw new ProductException("[" + key + "] value is not set in sql.properties file!");
        }

        return query;
    }

}