CREATE TABLE IF NOT EXISTS products (
        id varchar(100) NOT NULL PRIMARY KEY,
        name varchar(100) NOT NULL,
        type varchar(100),
        image varchar(1000),
        description text,
        base_quantity double precision NOT NULL,
        base_quantity_unit varchar(100),
        base_quantity_price double precision NOT NULL,
        min_quantity double precision NOT NULL,
        max_quantity double precision NOT NULL,
        steps double precision NOT NULL,
        date_first_available timestamp DEFAULT now(),
        available BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS schemes (
        id varchar(100) NOT NULL PRIMARY KEY,
        product_id varchar(100) REFERENCES products(id) ON DELETE CASCADE,
        comparator varchar(100),
        discount double precision,
        x double precision,
        y double precision
);

CREATE TABLE IF NOT EXISTS stocks (
        id SERIAL NOT NULL PRIMARY KEY,
        product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
        quantity DOUBLE PRECISION NOT NULL DEFAULT 0.0,
        last_update timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS raw_products (
        id varchar(100) NOT NULL PRIMARY KEY,
        name varchar(100) NOT NULL,
        quantity DOUBLE PRECISION NOT NULL DEFAULT 0.0
);

------------------------------------------------------------------------------------------
-- Create a default entry in stocks with quantity as zero
------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION insert_into_stocks()
RETURNS TRIGGER AS
$$
    BEGIN
        INSERT INTO stocks(product_id)
        VALUES (NEW.id);

        RETURN NEW;
    END;
$$
LANGUAGE 'plpgsql';

DROP TRIGGER IF EXISTS insert_into_stocks_trigger
  ON products;

CREATE TRIGGER insert_into_stocks_trigger
    AFTER INSERT
    ON products
    FOR EACH ROW
    EXECUTE PROCEDURE insert_into_stocks();

------------------------------------------------------------------------------------------
-- Trigger for udating stocks end
------------------------------------------------------------------------------------------
