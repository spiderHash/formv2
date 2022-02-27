var sql = require("mssql");
// config for your database



var config = {
    user: 'sa',
    password: 'Ssn@12345',
    server: 'localhost',
    database: 'TestDB',
    synchronize: true,
    trustServerCertificate: true,
};
// connect to your database

/*
sql.connect(config, function (err) {
    if (err) console.log("FAIL");
    // create Request object
    console.log("Connected1");
    var request = new sql.Request();
    // query to the database and get the records

    request.query(newQ, function(err,recordset){
      if (err) {console.log(err);
      }
      else{
        console.log(recordset);
      }
    });
});
*/
function createDB(){
sql.connect(config, function (err) {
  var createQuery = "if not exists(select * from sysobjects where name='usersData' and xtype='u') create table usersData(name nvarchar(20),add1 nvarchar(20),add2 nvarchar(20),district nvarchar(20),phone nvarchar(20))";
    if (err) console.log("FAIL");
    // create Request object
    console.log("Connected1");
    var request = new sql.Request();
    // query to the database and get the records

    request.query(createQuery, function(err,recordset){
      if (err) {console.log(err);
      }
      else{
        console.log("Table OK");
      }
    });
});
}


function insertData(name,add1,add2,dis,mob,success){
  createDB();
var insertQuery = `insert into usersData values('${name}','${add1}','${add2}','${dis}','${mob}')`;
sql.connect(config, function (err) {
    if (err) console.log(err);
    // create Request object
    console.log("Connected");
    var request = new sql.Request();
    // query to the database and get the records

    request.query(insertQuery, function(err,recordset){
      if (err) {
        success(err);
      }
      else{
      success("Insertion Successful")
      }
    });
});
}


function updateData(name,newAdd1,newAdd2,newDistrict,mob,success){
  createDB();
var updateQuery = `update usersData set add1='${newAdd1}' , add2='${newAdd2}', district='${newDistrict}' where name='${name}' and phone='${mob}'`;
sql.connect(config, function (err) {
    if (err) console.log(err);
    // create Request object
    console.log("Connected");
    var request = new sql.Request();
    // query to the database and get the records

    request.query(updateQuery, function(err,recordset){
      if (err) {
        success(err);
      }
      else{
      success("Updation Successful")
      }
    });
});
}


function deleteData(name,phone,success){
  createDB();
var deleteQuery = `delete from usersData where name = '${name}' and phone = '${phone}'`;
sql.connect(config, function (err) {
    if (err) console.log(err);
    // create Request object
    console.log("Connected");
    var request = new sql.Request();
    // query to the database and get the records

    request.query(deleteQuery, function(err,recordset){
      if (err) {
        success(err);
      }
      else{
      success("Deletion Successful")
      }
    });
});
}

function displayData(conditions,Callback){
  createDB();
var selectQuery = `select * from usersData ` + conditions;
sql.connect(config, function (err) {
    if (err) console.log(err);
    // create Request object
    console.log("Connected");
    var request = new sql.Request();
    // query to the database and get the records

    request.query(selectQuery, function (err, recordset) {
        if (err) console.log(err)
        // send records as a response
        Callback(recordset);
    });
});
}


function testRollback(Callback){
  createDB();
var initialQuery = "begin transaction insert into AkshatLedger values('4', 'Gokul','-1000') insert into GokulLedger values('4', 'Akshat', '+1000') select * from AkshatLedger select * from GokulLedger  rollback transaction  select * from AkshatLedger select * from GokulLedger ";
sql.connect(config, function (err) {
    if (err) console.log(err);
    // create Request object
    console.log("Connected");
    var request = new sql.Request();
    // query to the database and get the records

    request.query(initialQuery, function (err, recordset) {
        if (err) console.log(err)
        // send records as a response
        console.log(recordset.recordsets);
    });
});
}

function testCommit(Callback){
  createDB();
var initialQuery = "begin transaction insert into AkshatLedger values('4', 'Gokul','-1000') insert into GokulLedger values('4', 'Akshat', '1000') select * from AkshatLedger select * from GokulLedger  commit transaction  select * from AkshatLedger select * from GokulLedger ";
sql.connect(config, function (err) {
    if (err) console.log(err);
    // create Request object
    console.log("Connected");
    var request = new sql.Request();
    // query to the database and get the records

    request.query(initialQuery, function (err, recordset) {
        if (err) console.log(err)
        // send records as a response
        console.log(recordset.recordsets);
    });
});
}

module.exports = {insertData, deleteData, displayData, updateData,testRollback, testCommit};
