
CREATE TABLE IF NOT EXISTS base_products (
        id SERIAL NOT NULL PRIMARY KEY,
        name varchar(100) UNIQUE
);

CREATE TABLE IF NOT EXISTS products (
        id SERIAL NOT NULL PRIMARY KEY,
        name varchar(100) NOT NULL,
        image varchar(1000),
        date_first_available timestamp DEFAULT now(),
        available BOOLEAN NOT NULL DEFAULT FALSE,
        description text,
        base_product_id integer REFERENCES base_products(id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS category (
        id SERIAL NOT NULL PRIMARY KEY,
        product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
        unit varchar(5) NOT NULL,
        quantity DOUBLE PRECISION NOT NULL DEFAULT 0.0,
        price DOUBLE PRECISION NOT NULL DEFAULT 0.0
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
