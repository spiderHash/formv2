var sql = require("mssql");
// config for your database


var config;
console.log("Starttt");
require("fs").readFile("DB.txt", "utf8", (err,data) => {
  data = data.split("\n");
  config = {
      user: `${data[0]}`,
      password: `${data[1]}`,
      server: `${data[2]}`,
      database: `${data[3]}`,
      port: parseInt(`${data[4]}`),
      synchronize: true,
      trustServerCertificate: true,
  };
  console.log("DB variables recieved");
  console.log(data);
});

  var table_name= 'usersData';
//automatically creates table if not exists

function createTable(){
sql.connect(config, function (err) {
  var createQuery = `if not exists(select * from sysobjects where name='${table_name}' and xtype='u') create table ${table_name}(name nvarchar(20) not null,add1 nvarchar(20),add2 nvarchar(20),district nvarchar(20),phone nvarchar(11) not null)`;
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

function createTestTransactionTable(){
sql.connect(config, function (err) {
  var createQuery = `if not exists(select * from sysobjects where name='AkshatLedger' and xtype='u') create table AkshatLedger(trxn nvarchar(20) primary key ,partyName nvarchar(20),amount nvarchar(20)) if not exists(select * from sysobjects where name='GokulLedger' and xtype='u') create table GokulLedger(trxn nvarchar(20) constraint FK_trxn references AkshatLedger(trxn),partyName nvarchar(20),amount nvarchar(20))`;
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

//insert data into db. success is a callback function which will tell the frontend if the insertion was successful.
function insertData(name,add1,add2,dis,mob,success){
  db.init();
var insertQuery = `insert into ${table_name} values('${name}','${add1}','${add2}','${dis}','${mob}')`;
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

//update data into db. success is a callback function which will tell  the frontend if the updation was successful.
function updateData(name,newAdd1,newAdd2,newDistrict,mob,success){
  db.init();
var updateQuery = `update ${table_name} set add1='${newAdd1}' , add2='${newAdd2}', district='${newDistrict}' where name='${name}' and phone='${mob}'`;
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

//delete data from db.
function deleteData(name,phone,success){
  db.init();
var deleteQuery = `delete from ${table_name} where name = '${name}' and phone = '${phone}'`;
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


//displays data from db. conditions is the 'where' clause of the 'select' query. Callback is a callback function which will send query output to frontend.
function displayData(conditions,Callback){
  db.init();
var selectQuery = `select * from ${table_name} ` + conditions;
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
  db.init();
var initialQuery = "begin transaction insert into AkshatLedger values('4', 'Gokul','-1000') insert into GokulLedger values('4', 'Akshat', '+1000') select * from AkshatLedger select * from GokulLedger  rollback transaction  select * from AkshatLedger select * from GokulLedger ";
sql.connect(config, function (err) {
    if (err) console.log(err);
    // create Request object
    console.log("Connected12");
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
  db.init();
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

function init(){
    createTestTransactionTable();
    createTable();
}

module.exports = {insertData, deleteData, displayData, updateData,testRollback, testCommit,init};
