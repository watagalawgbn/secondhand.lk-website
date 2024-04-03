const mysql = require('mysql');

// MySQL database connection setup
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'as@21iif',
    database: 'testingg'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1); // Terminate the application if unable to connect to the database
    }
    console.log('Connected to MySQL database');
});

module.exports = connection;
