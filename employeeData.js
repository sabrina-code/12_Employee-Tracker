const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require('console.table');

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employee_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start(); //
});

function start() {
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}

function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all employees.",
        "View employees by manager.",
        "View employee roles and departments.",
        "Add new employee.",
        "Add department and role",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View all employees.":
        viewAllEmployee();
        break;

      case "View employees by manager.":
        viewByManager();
        break;

      case "View employee roles and departments.":
        viewEmployeeRole();
        break;

      case "Add new employee.":
        addEmployee();
        break;

      case "Add department and role.":
        addDept();
        break;

      case "exit":
        connection.end();
        break;
      }      
      });      
}
function viewAllEmployee(){
  const query = "SELECT e.id, e.first_name, e.last_name, r.title as title, r.salary as salary, d.department as department, CONCAT(m.first_name ,' ' , m.last_name) AS manager FROM employee e LEFT JOIN employee_role r ON e.role_id = r.role_id LEFT JOIN department d ON r.department_id = d.department_id LEFT JOIN employee m on e.manager_id = m.role_id ORDER BY e.id";
  // const query = "SELECT id, first_name, last_name, title FROM employee";
  connection.query(query, function(err, res){
    if (err) throw err;
    console.table(res);
    start();
  });
}

function viewByManager(){
  const query = "SELECT e.first_name, e.last_name, CONCAT(m.first_name ,' ' , m.last_name) AS manager FROM employee e INNER JOIN employee m ON e.manager_id = m.role_id";
  // const query = "SELECT id, first_name, last_name, title FROM employee";
  connection.query(query, function(err, res){
    if (err) throw err;
    console.table(res);
    start();
  });
}

function viewEmployeeRole(){
  const query = "SELECT r.title, r.salary, d.department as department FROM employee_role r LEFT JOIN department d ON r.department_id = d.department_id";
  connection.query(query, function(err, res){
    if (err) throw err;
    console.table(res);
    start();
  });
}

function addEmployee(){
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?"
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?"
      },
      {
        name: "actionR",
        type: "list",
        message: "What is the job role for the employee?",
        choices:[
          "Sales Lead",
          "Salesperson",
          "Lead Engineer",
          "Sofware Engineer",
          "accountant",
          "Leagal Team Lead",
          "Lawyer"
        ]
      },
      {
        name: "actionM",
        type: "list",
        message: "Who is the employee's manager?",
        choices:[
          "John Smith",
          "Adam Schiff",
          "Rose Water"
        ]
      }
    ])
    .then(function(answer) {
      switch (answer.actionR) {
        case "Sales Lead":
          answer.role_id = 190;
          break;
        case "Salesperson":
          answer.role_id = 101;
          break;
        case "Lead Engineer":
          answer.role_id = 290;
          break;
        case "Sofware Engineer":
          answer.role_id = 201;
          break;
        case "accountant":
          answer.role_id = 390;
          break;
        case "Leagal Team Lead":
          answer.role_id = 490;
          break;
        case "Lawyer":
          answer.role_id = 401;
          break;
      }
      switch (answer.actionM) {
        case "John Smith":
          answer.manager_id = 190;
          break;
        case "Adam Schiff":
          answer.manager_id = 290;
          break;
        case "Rose Water":
          answer.manager_id = 490;
          break;
      }
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.role_id,
          manager_id: answer.manager_id
        },
        function(err) {
          if (err) throw err;
          console.log("The employee was created successfully!");
          start(); 
        }
      );
    });
}

function addDept(){
  inquirer
    .prompt(
    {
      name: "newDept",
      type: "input",
      message: "Please input the name of the department to be added."
    })
    .then(function(answer){
      connection.query(
        "INSERT INTO department SET ?",
        {
          department: answer.newDept
        }, 
        function(err) {
          if (err) throw err;   
          console.log("The new department was added sucessfully."); 
          addRole();       
        }        
        );        
    });      
  }

  function addRole(){
    inquirer
      .prompt([
        {
          name: "newDeptRole",
          type: "input",
          message: "Which department this role belongs to?"
        },
        {
          name: "newTitle",
          type: "input",
          message: "Please enter the title of the new role."
        },
        {
          name: "newRoleId",
          type: "input",
          message: "Please enter a role id for the title.",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        },
        {
          name: "newSalary",
          type: "input",
          message: "Please enter the salary for the role.",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
    .then(function(answer){
      connection.query(
        "INSERT INTO employee_role SET ?",
      {
        title: answer.newTitle,
        role_id: answer.newRoleId,
        salary: answer.newSalary,
        department_id: answer.newDeptId
      },
      function(err) {
        if (err) throw err;
        start(); 
      });
    });
}

function updateRole(){
  inquirer
    .prompt({
      name: "actionRole",
      type: "list",
      message: "What role the employee should be updated to?",
      choices:[
        "Sales Lead",
        "Salesperson",
        "Lead Engineer",
        "Sofware Engineer",
        "accountant",
        "Leagal Team Lead",
        "Lawyer"
      ]
    }).then(function(answer){
      switch(answer.actionRole){
        case "John Smith":
          answer.manager_id = 190;
          break;
        case "Adam Schiff":
          answer.manager_id = 290;
          break;
        case "Rose Water":
          answer.manager_id = 490;
          break;
      }
      start();
    });
}