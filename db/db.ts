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
module.exports = connection;