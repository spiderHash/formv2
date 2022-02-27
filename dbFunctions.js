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
  var createQuery = "if not exists(select * from sysobjects where name='testForm3' and xtype='u') create table testForm3(name nvarchar(20),add1 nvarchar(20),add2 nvarchar(20),district nvarchar(20),phone nvarchar(20))";
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
var insertQuery = `insert into testForm3 values('${name}','${add1}','${add2}','${dis}','${mob}')`;
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
var updateQuery = `update testForm3 set add1='${newAdd1}' , add2='${newAdd2}', district='${newDistrict}' where name='${name}' and phone='${mob}'`;
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
var deleteQuery = `delete from testForm3 where name = '${name}' and phone = '${phone}'`;
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
var selectQuery = `select * from testForm3 ` + conditions;
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
var initialQuery = "begin transaction insert into testForm3 values('Rollbacktest2','test2','test2','test2','TWO') insert into testForm2 values('Rollbacktest3','test3','test3','test3','THREE') select * from testForm3 select * from testForm2  commit transaction select * from testForm3 select * from testForm2";
sql.connect(config, function (err) {
    if (err) console.log(err);
    // create Request object
    console.log("Connected");
    var request = new sql.Request();
    // query to the database and get the records

    request.query(initialQuery, function (err, recordset) {
        if (err) console.log(err)
        // send records as a response
        console.log(recordset);
    });
});
}

module.exports = {insertData, deleteData, displayData, updateData,testRollback};
