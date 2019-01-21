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
  
  Welcome Supervisor
  
  `);

  // Call function to prompt supervisor
  promptSupervisor();
});

const promptSupervisor = () => {

  // prompt supervisor for action
  inquirer
    .prompt([
      {
        type: "list"
        , name: "supervisorFunction"
        , message: "Which function do you wish to perform?"
        , choices: ["View Product Sales By Department", "Create New Department", "Exit"]
      }
    ])
    .then(userResp => {
      // console.log(userResp);

      switch (userResp.supervisorFunction) {
        case 'View Product Sales By Department':
          // console.log('View Product Sales By Department')
          viewSalesReport();
          break;
        case 'Create New Department':
          // console.log('Create New Department');
          createNewDepartment();
          break;
        default:
          process.exit();
      }
    });
};

const viewSalesReport = () => {

  // Create the heading for the table
  const table = new Table({ head: [`Id`, `Department`, `Overhead`, `Sales`, `Profit`] });

  // Select the report fields
  const query =
    db.query("SELECT department_id, department_name, AVG(overhead_costs) AS overhead, sum(product_sales) AS total_sales, (sum(product_sales) - overhead_costs) AS total_profit FROM departments LEFT JOIN products ON department_name = dept_name GROUP BY department_id, department_name",
      (err, deptData) => {

        // If an error occurs report it
        if (err) throw err;

        // Loop through the departments returned from the database and load into table
        deptData.forEach(dept => {

          // If results from query are NULL, type will be object, set value to 0 for display
          if (typeof(dept.total_sales) === 'object') dept.total_sales = 0;
          if (typeof(dept.total_profit) === 'object') dept.total_profit = 0;
          
          table.push([`${dept.department_id}`,
          `${dept.department_name}`,
          `$${dept.overhead.toFixed(2)}`,
          `$${dept.total_sales.toFixed(2)}`,
          `$${dept.total_profit.toFixed(2)}`]);
        });

        // Display table on screen
        console.log(table.toString());
        console.log();
        // Prompt the supervisor for the next action
        promptSupervisor();
      });

  // console.log(query.sql)
};

const createNewDepartment = () => {

  // Prompt the supervisor for the new department name and overhead costs
  inquirer
    .prompt([
      {
        type: "input"
        , name: "dept"
        , message: "What department do you want to add?"
      },
      {
        type: "input"
        , name: "overhead"
        , message: "What is the monthly overhead?"
        , validate: (overhead) => {
          if (!isNaN(overhead)) {
            return true;
          }
          else {
            return false;
          }
        }
      }
    ]).then(userResp => {
      // console.log(userResp);

      // Call the function to add new dept
      addDept(userResp);
    })
}

// Add new dept to database
const addDept = (userResp) => {
  // console.log(userResp);

  // SQL query to insert new item in database
  const query = db.query("INSERT INTO departments SET ?",
    {
      department_name: userResp.dept,
      overhead_costs: userResp.overhead
    },
    (err, res) => {

      // If an error occurs, report it
      if (err) throw err;

      // report item inserted
      console.log(`
        ${res.affectedRows} department inserted!
        `);

      // Prompt the supervisor for the next action
      promptSupervisor();
    });

  // console.log(`Add item: ${query.sql}`);
};