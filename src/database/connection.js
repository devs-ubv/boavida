const mysql = require('mysql')
const util = require('util');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'grupoboavidasite'
})
const query = util.promisify(connection.query).bind(connection);
const end = util.promisify(connection.end).bind(connection);

module.exports = { query, end};