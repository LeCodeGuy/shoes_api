create table users (
	id SERIAL NOT NULL PRIMARY KEY,
	username TEXT UNIQUE NOT NULL,
	password TEXT UNIQUE NOT NULL,
	active BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE products (
    id SERIAL NOT NULL PRIMARY KEY,
    color VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    size INT NOT NULL,
    in_stock INT NOT NULL,
    -- image VARCHAR(255) NOT NULL
);

CREATE TABLE cart(
    id SERIAL NOT NULL PRIMARY KEY,
    status VARCHAR(8),
    username TEXT UNIQUE NOT NULL
);

CREATE TABLE cart_items(
    id SERIAL NOT NULL PRIMARY KEY,
    fk_cart_id INT ,
    fk_product_id INT ,
    qty INT NOT NULL,
    FOREIGN KEY(fk_product_id) REFERENCES products(id),
    FOREIGN KEY(fk_cart_id) REFERENCES cart(id)
);