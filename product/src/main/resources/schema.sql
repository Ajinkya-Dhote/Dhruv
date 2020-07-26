
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
