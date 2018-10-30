DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT
  ,product_name VARCHAR(40)
  ,dept_name VARCHAR(40)
  ,price DECIMAL(10,2)
  ,stock_qty INT
  ,PRIMARY KEY (id)
)