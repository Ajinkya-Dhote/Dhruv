CREATE TABLE IF NOT EXISTS products (
        id SERIAL NOT NULL PRIMARY KEY,
        name varchar(100) NOT NULL,
        type varchar(100),
        description text,
        price double precision NOT NULL,
        date_first_available timestamp DEFAULT now(),
        available BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS stocks (
        id SERIAL NOT NULL PRIMARY KEY,
        product_id INTEGER REFERENCES products(id),
        quantity DOUBLE PRECISION NOT NULL DEFAULT 0.0,
        last_update timestamp DEFAULT now()
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