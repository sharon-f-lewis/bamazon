DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT
  ,product_name VARCHAR(40)
  ,dept_name VARCHAR(40)
  ,price DECIMAL(10,2)
  ,stock_qty INT
  ,product_sales DECIMAL(10,2) DEFAULT 0
  ,PRIMARY KEY (id)
);

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT
  ,department_name VARCHAR(40)
  ,overhead_costs DECIMAL(10,2)
  ,PRIMARY KEY (department_id)
);