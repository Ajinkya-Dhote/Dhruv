CREATE TABLE IF NOT EXISTS products (
        id SERIAL NOT NULL PRIMARY KEY,
        name varchar(100) NOT NULL,
        type varchar(100),
        description text,
        price double precision NOT NULL,
        date_first_available timestamp DEFAULT now(),
        available BOOLEAN NOT NULL DEFAULT FALSE
    );