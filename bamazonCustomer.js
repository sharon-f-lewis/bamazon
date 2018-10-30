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
  listItems();
});

// List items in database
const listItems = () => {

  const table = new Table({head: ['Id', 'Description', 'Department', 'Price']});

  const query = db.query("SELECT * FROM products", (err, productData) => {
    if (err) throw err;

    productData.forEach(product => {
      table.push([`${product.id}`, `${product.product_name}`, `${product.dept_name}`, `${product.price}`]);
    });
    console.log(table.toString());
    console.log("");
    promptUser();
  });
  // console.log(query.sql);
}

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
        , validate: function (qty) {
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
      checkQty(userResp);
      listItems();
    });
}

const checkQty = (userResp) => {
  const query = db.query("SELECT stock_qty, price FROM products WHERE id = ?", [userResp.prodID], (err, prodData) => {
    if (err) throw err;

    prodData.forEach((prod) => {
      if (userResp.qty > prod.stock_qty) {
        console.log(`
------------------------------------------
Insufficient Qty
------------------------------------------
`);
        return false;
      }
      else {
        const remainingQty = prod.stock_qty - userResp.qty;
        sellMerch(userResp.prodID, remainingQty);
        const amtSpent = userResp.qty * prod.price;
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
}

const sellMerch = (prodId, qty) => {
  // console.log(prodId, qty);
  const query = db.query("UPDATE products SET stock_qty = ? WHERE id = ?", [qty,])
}