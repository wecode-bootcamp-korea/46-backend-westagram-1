var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '6309',
    database: 'westagram_46'
});

connection.connect();

connection.query('SELECT * FROM users', function (error, results, fields) {
    if (error) {
    }
});
connection.end();


