USE bamazon_db;

DELETE FROM products;
DELETE FROM departments;

INSERT INTO products
  (product_name, dept_name, price, stock_qty)
VALUES
  ('Skillet', 'Housewares', 2.50, 35)
  ,('Frying Pan', 'Housewares', 4.50, 3)
  ,('Bed Sheets', 'Bed & Bath', 12.50, 15)
  ,('Pillows', 'Bed & Bath', 7.25, 99)
  ,('The Fray - The Fray', 'CDs', 15.25, 8)
  ,('Tracks of My Years - Bryan Adams', 'CDs', 22.35, 12)
  ,('3 Muskateers', 'Candy', 1.25, 12)
  ,('Snickers', 'Candy', 1.25, 12)
  ,('Milk', 'Grocery', 2.60, 8)
  ,('Cheese', 'Grocery', 1.90, 10)
;

INSERT INTO departments
  (department_name, overhead_costs)
VALUES
  ('Housewares', 100)
  ,('Bed & Bath', 500)
  ,('CDs', 250)
  ,('Candy', 500)
  ,('Grocery', 250)
;