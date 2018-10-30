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
  console.log("You're now connected to the database");
  console.log("");
  promptManager();
});

const promptManager = () => {
  console.log(`Welcome Manager
  
  `);
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
      console.log(userResp);
      switch (userResp.managerFunction) {
        case 'View Products for Sale':
          console.log('View Products for Sale');
          viewProducts();
          break;
        case 'View Low Inventory':
          console.log('View Low Inventory');
          viewLowInventory();
          break;
        case 'Add to Inventory':
          console.log('Add to Inventory');
          increaseInventory();
          break;
        case 'Add New Product':
          console.log('Add New Product');
          newProduct();
          break;
        default:
          process.exit();
      }
    });
};

const viewProducts = () => {
  console.log('view products');
  const table = new Table({head: ['Id', 'Description', 'Price', 'Qty']});

  const query = db.query("SELECT id, product_name, price, stock_qty FROM products", (err, productData) => {
    if (err) throw err;

    productData.forEach(product => {
      table.push([`${product.id}`, `${product.product_name}`, `${product.price}`, `${product.stock_qty}`]);
    });
    console.log(table.toString());
    console.log();
    promptManager();
  });
  console.log(query.sql);
};

const viewLowInventory = () => {
  console.log('view low inventory');
  promptManager();
};

const increaseInventory = () => {
  console.log('increase inventory');
  promptManager();
};

const newProduct = () => {
  console.log('new product');
  promptManager();
};
