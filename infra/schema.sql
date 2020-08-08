
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

CREATE TABLE IF NOT EXISTS public.mill
(
    id bigint NOT NULL,
    mill_name text COLLATE pg_catalog."default" NOT NULL,
    owner_first_name text COLLATE pg_catalog."default" NOT NULL,
    owner_last_name text COLLATE pg_catalog."default" NOT NULL,
    contact_no numeric NOT NULL,
    email text COLLATE pg_catalog."default",
    number_of_machine bigint NOT NULL,
    no_of_workers bigint NOT NULL,
    address_line1 text COLLATE pg_catalog."default",
    address_line2 text COLLATE pg_catalog."default",
    address_line3 text COLLATE pg_catalog."default",
    city text COLLATE pg_catalog."default" NOT NULL,
    state text COLLATE pg_catalog."default" NOT NULL,
    pin_code text COLLATE pg_catalog."default" NOT NULL,
    area text COLLATE pg_catalog."default",
    landmark text COLLATE pg_catalog."default",
    longitude numeric,
    latitude numeric,
    bank_id bigint NOT NULL DEFAULT 0,
    CONSTRAINT "Mill_pkey" PRIMARY KEY (id)
)

CREATE TABLE IF NOT EXISTS public.bank
(
    id numeric NOT NULL,
    bank_name text COLLATE pg_catalog."default" NOT NULL,
    account_no numeric NOT NULL,
    ifsc_code text COLLATE pg_catalog."default" NOT NULL,
    upi_id text COLLATE pg_catalog."default",
    CONSTRAINT bank_pkey PRIMARY KEY (id)
)

CREATE SEQUENCE IF NOT EXISTS public.hibernate_sequence
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 92233720
