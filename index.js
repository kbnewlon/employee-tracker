var mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "employeeTracker_db;"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    chartQuestion();
});

function chartQuestion(){
    inquirer.prompt([
        {
            name:"choice",
            message: "What would you like to do?",
            choices:["View All Employees", "View All Employees By Department","View All Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager"]
        },
        {
            name: ""
        }
    ])
}

// Build a command-line application that at a minimum allows the user to:

//   * Add departments, roles, employees

//   * View departments, roles, employees

//   * Update employee roles

// Bonus points if you're able to:

//   * Update employee managers

//   * View employees by manager

//   * Delete departments, roles, and employees

//   * View the total utilized budget of a department -- ie the combined salaries of all employees in that department

USE employeeTracker_db;
 SELECT employee.id,employee.first_name,employee.last_name,title,department_name department, CONCAT( manager.first_name," ", manager.last_name ) Manager,salary FROM employee 
 LEFT JOIN role  ON employee.role_id=role.id
 LEFT JOIN department ON role.department_id=department.id 
 LEFT JOIN employee manager ON manager.id=employee.manager_id
 ;

 connection.end;