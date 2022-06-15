const mysql = require('mysql');

module.exports = {
  testdb,
  selectEmployees
}

const config = {
  host: process.env.HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB
}

const employeedb = mysql.createConnection(config);


function testdb(res){

  employeedb.query(`select 1 + 1 as solution`, (err, result, fields)=>{
    if(err) throw err;
    res.send(result[0].solution)
  })
}

function selectEmployees(res){

  employeedb.query(`call employees_db.selectAllEmployees();`, (err, recordset, fields)=>{
    if(err){ console.log(err)}
    res.send(recordset[0])
  })
}