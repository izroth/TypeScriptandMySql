//intergrate with mysql
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'lakhan',
    database: 'test'
  });
  
connection.connect((err: any) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Connected to MySQL server');
    }
}
);
//create table signup
connection.query(
    `CREATE TABLE IF NOT EXISTS signup (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        timestamp datetime NOT NULL
    )`,
    (err: any, results: any) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Table signup created');
        }
    }
);
//create table login
connection.query(
    `CREATE TABLE IF NOT EXISTS login (
        id INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        jwt VARCHAR(255) NOT NULL,
        timestamp datetime NOT NULL
    )`,
    (err: any, results: any) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Table login created');
        }
    }
);


module.exports = connection;