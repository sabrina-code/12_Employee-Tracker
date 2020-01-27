DROP DATABASE IF EXISTS employee_DB;
CREATE database employee_DB;

USE employee_DB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  department VARCHAR(30) NULL,
  department_id INT NULL,
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

INSERT INTO department (department, department_id)
VALUES ("Sales", 100),("Engineering", 200),("Finance", 300),("Legal", 400);

INSERT INTO employee_role (title, salary, role_id, department_id)
VALUES ("Sales Lead", 100000, 190, 100),
("Salesperson", 90000, 101, 100),
("Lead Engineer", 150000, 290, 200),
("Software Engineer", 120000, 201, 200),
("Accountant", 125000, 390, 300),
("Leagal Team Lead", 250000, 490, 400),
("Lawyer", 190000, 401, 400);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith",190, null),
("Alice", "Gerber", 101, 190),
("Henry", "Gerber", 101, 190),
("Adam", "Schiff", 290, null),
("Bill", "Payer", 201, 290),
("Elton", "Screamer", 201, 290),
("Muse", "Caker", 390, null),
("Rose", "Water", 490, null),
("Berkely", "Hill", 401, 490);

    
