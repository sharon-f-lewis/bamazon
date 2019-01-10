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

  Welcome Manager
  
  `);

  // Call function to prompt manager
  promptManager();
});

// Prompt the manager for the actions. Call the appropriate function in response.
const promptManager = () => {

  // prompt manager for action
  inquirer
    .prompt([
      {
        type: "list"
        , name: "managerFunction"
        , message: "Which function do you wish to perform?"
        , choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
      }
    ])
    .then(userResp => {
      // console.log(userResp);

      switch (userResp.managerFunction) {
        case 'View Products for Sale':
          // console.log('View Products for Sale');
          viewProducts();
          break;
        case 'View Low Inventory':
          // console.log('View Low Inventory');
          viewLowInventory();
          break;
        case 'Add to Inventory':
          // console.log('Add to Inventory');
          increaseInventory();
          break;
        case 'Add New Product':
          // console.log('Add New Product');
          newProduct();
          break;
        default:
          process.exit();
      }
    });
};

// Display a table showing the products available for the manager
const viewProducts = () => {
  // console.log('view products');

  // Create the heading for the table
  const table = new Table({ head: ['Id', 'Description', 'Price', 'Qty'] });

  // Select the products from the database
  const query = db.query("SELECT id, product_name, price, stock_qty FROM products", (err, productData) => {

    // If an error occurs report it
    if (err) throw err;

    // Loop through the products returned from the database and load into table
    productData.forEach(product => {
      table.push([`${product.id}`,
      `${product.product_name}`,
      `${product.price.toFixed(2)}`,
      `${product.stock_qty}`]);
    });

    // Display table on screen
    console.log(table.toString());
    console.log();

    // Prompt the manager for the next action
    promptManager();
  });
  // console.log(query.sql);
};

// Display a table showing the products with low inventory
const viewLowInventory = () => {
  // console.log('view low inventory');

  // Create the heading for the table
  const table = new Table({ head: ['Id', 'Description', 'Price', 'Qty'] });

  // Select products from database with less then 5 in stock
  const query = db.query("SELECT id, product_name, price, stock_qty FROM products WHERE stock_qty < 5", (err, productData) => {

    // If an error occurs, report it
    if (err) throw err;

    // Loop through the products returned from the database and load into table
    productData.forEach(product => {
      table.push([`${product.id}`,
      `${product.product_name}`,
      `${product.price.toFixed(2)}`,
      `${product.stock_qty}`]);
    });

    // Display table on screen
    console.log(table.toString());
    console.log();

    // Prompt the manager for the next action
    promptManager();
  });
};

const increaseInventory = () => {
  // console.log('increase inventory');

  // Ask the maanger what item they want to increase
  inquirer
    .prompt([
      {
        type: "input"
        , name: "prodID"
        , message: "Which product?"
        , default: "1"
      },
      {
        type: "input"
        , name: "qty"
        , message: "Amount?"
        , default: "1"
        , validate: (qty) => {
          if (!isNaN(qty)) {
            return true;
          }
          else {
            return false;
          } // end if
        } // end validate
      } // end qty prompt
    ])
    .then(userResp => {
      console.log(userResp);
      updateQty(userResp);

      // Prompt the manager for the next action
      promptManager();
    });
};

const updateQty = (resp) => {
  // console.log(resp);

  // Write query to update 
  const query = db.query("UPDATE products SET stock_qty = stock_qty + ? WHERE id = ?", [parseInt(resp.qty), resp.prodID], (err, res) => {

    // If an error occurs, report it
    if (err) throw err;

    // report item updated
    console.log(`${res.affectedRows} product updated!`);
  });
  console.log(`update ${query.sql}`);
};

const newProduct = () => {
  // console.log('new product');

  // Prompt the manager for the new product, price, and quantity
  inquirer
    .prompt([
      {
        type: "input"
        , name: "product"
        , message: "What product do you want to add?"
      },
      {
        type: "input"
        , name: "dept"
        , message: "What department is the product?"
      },
      {
        type: "input"
        , name: "price"
        , message: "How munch to charge?"
        , validate: (price) => {
          if (!isNaN(price)) {
            return true;
          }
          else {
            return false;
          }
        }
      },
      {
        type: "input"
        , name: "qty"
        , message: "How many units available?"
        , validate: (qty) => {
          if (!isNaN(qty)) {
            return true;
          }
          else {
            return false;
          }
        }
      }
    ]).then(userResp => {
      // console.log(userResp);

      // Call function to add new item
      addItem(userResp);

      // Prompt the manager for the next action
      promptManager();

    });
};

// Add new item to database
const addItem = (userResp) => {
  console.log(userResp);

  // SQL query to insert new item in database
  const query = db.query("INSERT INTO products SET ?",
    {
      product_name: userResp.product,
      dept_name: userResp.dept,
      price: parseFloat(userResp.price),
      stock_qty: parseInt(userResp.qty)
    },
    (err, res) => {

      // If an error occurs, report it
      if (err) throw err;

      // report item inserted
      console.log(`${res.affectedRows} product inserted!`);

    });

  console.log(`Add item: ${query.sql}`);
};