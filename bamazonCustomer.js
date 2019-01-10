// import dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table3");

// connect database
const db = mysql.createConnection({
  host: "localhost"
  , port: 3306
  , user: "root"
  , password: "password"
  , database: "bamazon_db"
});

// turn on datbase connection
db.connect((err) => {
  if (err) throw err;
  console.log(`You're now connected to the database
  
  Welcome Customer
  
  `);
  listItems();
});

// Read all the items in the database and 
const listItems = () => {

  // Build table heading
  const table = new Table({ head: ['Id', 'Description', 'Department', 'Price']});

  // Select the products from the database
  const query = db.query("SELECT id, product_name, dept_name, price FROM products", (err, productData) => {

    // If an error occurs, report it
    if (err) throw err;

    // Loop through the products returned from the database and load into table
    productData.forEach(product => {
      table.push([`${product.id}`, 
      `${product.product_name}`, 
      `${product.dept_name}`, 
      `$${product.price.toFixed(2)}`]);
    });

    // Display table on screen
    console.log(table.toString());
    console.log("");

    // Prompt the user for the next purchase
    promptUser();
  });
  // console.log(query.sql);
};

// Ask the user what they wish to buy
const promptUser = () => {
  inquirer
    .prompt([
      {
        name: "prodID"
        , message: "What is the id of the product you wish to buy?"
        , type: "input"
        , default: "1"
      },
      {
        name: "qty"
        , message: "How many would you like?"
        , type: "input"
        , default: "1"
        , validate: (qty) => {
          if (!isNaN(qty)) {
            return true;
          }
          else {
            return false;
          }
        }
      }
    ])
    .then(userResp => {
      // console.log(userResp);

      // Call function to check quantity
      checkQty(userResp);

      // List the items available 
      listItems();
    });
};

// Check the qty purchased against the available amount
const checkQty = (userResp) => {

  // Query the database to find the qty available 
  const query = db.query("SELECT stock_qty, price FROM products WHERE id = ?", [userResp.prodID], (err, prodData) => {

    // If an error occurs, report it
    if (err) throw err;

    // Check the qty for the product selected
    prodData.forEach((prod) => {

      // If there isn't enough inventory, alert the customer
      if (userResp.qty > prod.stock_qty) {
        console.log(`
------------------------------------------
Insufficient Qty
------------------------------------------
`);
        return false;
      }
      else {
        // Calculate remaining inventory
        const remainingQty = prod.stock_qty - userResp.qty;

        // Calculate amont spent by user
        const amtSpent = userResp.qty * prod.price;

        // Call function to update inventory
        sellMerch(userResp.prodID, remainingQty, amtSpent);

        // Tell the customer how much he just spent
        console.log(`

------------------------------------------
  Sale Processed - Your total ${amtSpent}
------------------------------------------

`);
        return true;
      }
    });
  });
  // console.log(query.sql);
};

// Update quantity to reflect items sold
const sellMerch = (prodId, qty, spent) => {
  
  // console.log(prodId, qty);
  const query = db.query("UPDATE products SET stock_qty = ?, product_sales = product_sales + ? WHERE id = ?", [qty, spent, prodId], (err) => {
    
    // if an error occurs, report it
    if (err) throw err;
  });

  // console.log(`sell: ${query.sql}`);
};