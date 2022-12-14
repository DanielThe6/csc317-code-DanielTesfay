const mysql = require('mysql');

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'post-image-database'
});

dbConn.connect(function (error) {
    if (error) throw error;
    console.log('Database Connected Successfully!!!');
})

module.exports = dbConn;