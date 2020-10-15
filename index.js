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
                "Update Employee Role", ,
                "Quit"
            ]
        }]).then(function (answer) {
            switch (answer.action) {
                case "View All Employees":
                    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, title, department_name department, CONCAT(manager.first_name,' ',manager.last_name) manager, salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id`,
                        function (err, data) {
                            if (err) {
                                throw err;
                            }
                            console.table(data);
                            mainMenu();
                        });
                    break;

                case "Add Employee":
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
                            message: "What is the title of the employees role?"
                        },
                        {
                            name: "department",
                            type: "input",
                            message: "What department will this employee be working in?"
                        },
                        {
                            name: "manager",
                            type: "confirm",
                            message: "Is Jane Morgan their manager?"
                        },
                        {
                            name: "salary",
                            type: "input",
                            message: "What is their salary?"
                        }


                    ]).then(function (answers) {
                        connection.query("INSERT INTO employee set ?", {
                            first_name: answers.first_name,
                            last_name: answers.last_name,
                            title: answers.role.title,
                            department: answers.department,
                            manager: answers.manager,
                            salary: answers.salary
                        }, function (err, data) {
                            if (err) {
                                throw err;
                            }
                            console.table(data);
                            mainMenu();

                        });
                    });
                    break;

                case "View All Roles":
                    connection.query(`SELECT role.id, role.title, role.salary, department.department_name AS department FROM role LEFT JOIN department ON role.department_id = department.id ORDER BY role.title`,
                        function (err, data) {
                            if (err) {
                                throw err;
                            }
                            console.table(data);
                            mainMenu();
                        });
                    break;

                case "Add Role":
                    inquirer.prompt([
                        {
                            name: "title",
                            type: "input",
                            message: "What is the title for this role?"
                        },
                        {
                            name: "salary",
                            type: "input",
                            message: "What is salary for this role?"
                        },
                        {
                            name: "departmentID",
                            type: "input",
                            message: "What is the department ID for this role?"
                        },
                    ]).then(function (response) {
                        connection.query(`INSERT INTO role (title, salary, department_id) VALUES ('${response.title}', '${response.salary}', '${response.departmentID}')`), 
                        function (err, data) {
                                if (err) {
                                    throw err;
                                }
                                console.table(data);
                                mainMenu();
                            
                    }});
                        break;

                case "View All Departments":
                    connection.query("SELECT * FROM department",
                        function (err, data) {
                            if (err) {
                                throw err;
                            }
                            console.table(data);
                            mainMenu();
                        });
                    break;

                case "Add Department":
                    connection.query()
                    break;

                case "Update Employee Role":
                    connection.query("UPDATE ")
                    break;

                case "Quit":
                    connection.end();
                    break;
            }

        })
};