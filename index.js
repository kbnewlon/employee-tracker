var mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "employeeTracker_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    mainMenu();
});

function mainMenu() {
    inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: ["View All Employees",
                "Add Employee",
                "View All Roles",
                "Add Role",
               "View All Departments",
                "Add Department",
                "Update Employee Role",,
                "Quit"
            ]
        }]).then(function (answer) {
            switch (answer.action) {
                case "View All Employees":
                    connection.query("SELECT employee.id, employee.first_name, employee.last_name, title, department_name department, CONCAT(manager.first_name,' ',manager.last_name) Manager, salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id",
                        function (err, data) {
                            if (err) {
                                throw err;
                            }
                            console.table(data);
                            mainMenu();
                        });
                    break;

                case "Add Employee":
                    connection.query(

                    )

                    inquirer.prompt([
                        {
                            name: "first_name",
                            type: "input",
                            message: "What is the first name of the employee you'd like to add?"

                        },
                        {
                            name: "last_name",
                            type: "input",
                            message: "What is the last name of the employee you'd like to add?"
                        },
                        {
                            name: "title",
                            type: "input",
                            message: "What is the title of the employee you'd like to add?"
                        },
                        {
                            name: "department",
                            type: "input",
                            message: "What department will this employee be working in?"
                        },

                    ])
                    break;

                case "View All Roles":
                    connection.query("SELECT role.id, role.title, role.salary, department.department_name AS department FROM role LEFT JOIN department ON role.department_id = department.id ORDER BY role.title",
                    function (err, data) {
                        if (err) {
                            throw err;
                        }
                        console.table(data);
                        mainMenu();
                    });
                    break;

                case "Add Role":
                    break;

                case "View All Departments":
                    break;

                case "Add Department":
                    break;

                case "Update Employee Role":
                    break;

                case "Quit":
                    connection.end();
                    break;
            }

        })
};