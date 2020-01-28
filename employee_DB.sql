DROP DATABASE IF EXISTS employee_DB;
CREATE database employee_DB;

USE employee_DB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  department VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee_role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,2) NULL,
  role_id INT NULL,
  department_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL, 
  manager_id INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO department (id, department)
VALUES (1, "Sales"),(2, "Engineering"),(3, "Finance"),(4, "Legal");

INSERT INTO employee_role (title, salary, role_id, department_id)
VALUES ("Sales Lead", 100000, 1000, 1),
("Salesperson", 90000, 10, 1),
("Lead Engineer", 150000, 2000, 2),
("Software Engineer", 120000, 20, 2),
("Accountant", 125000, 3000, 3),
("Leagal Team Lead", 250000, 4000, 4),
("Lawyer", 190000, 40, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith",1000, null),
("Alice", "Gerber", 10, 1000),
("Henry", "Gerber", 10, 1000),
("Adam", "Schiff", 2000, null),
("Bill", "Payer", 20, 2000),
("Elton", "Screamer", 20, 2000),
("Muse", "Caker", 3000, null),
("Rose", "Water", 4000, null),
("Berkely", "Hill", 40, 4000);

    
