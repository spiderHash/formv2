
const db = require('./dbFunctions.js');



function selectResult(result){
  console.log(result);
  console.log(result.rowsAffected[0]);
  console.log(result.recordset[0]);
  console.log(result.recordset[0].name);

}
//success is a callback function.
function success(result){
  console.log(result);
  var html = '';

    setTimeout(function () {

            html += '<p>' + result + '</p>'

        document.getElementById("success-result").innerHTML = html
    }, 500)
}


console.log("DONE");

function insertForm(event) {
    event.preventDefault() // stop the form from add1itting
    name = document.getElementById("name").value;
    add1 = document.getElementById("add1").value;
    add2 = document.getElementById("add2").value;
    district = document.getElementById("district").value;
    phone = document.getElementById("phone").value;
    console.log(name);
    if(name=='' || phone =='')
    {
      success("Name & Phone no. are mandatory");
      return;
    }
    db.insertData(name,add1,add2,district,phone,success);
    document.getElementById("form").reset();
}

function updateForm(event) {
    event.preventDefault() // stop the form from add1itting
    console.log("CALLED");
    name = document.getElementById("name").value;
    add1 = document.getElementById("add1").value;
    add2 = document.getElementById("add2").value;
    district = document.getElementById("district").value;
    phone = document.getElementById("phone").value;
    if(name=='' || phone =='')
    {
      success("Name & Phone no. are mandatory");
      return;
    }
    db.updateData(name,add1,add2,district,phone,success);
    document.getElementById("form").reset();
}

function deleteForm(event) {
    event.preventDefault() // stop the form from add1itting
    console.log("CALLED");
    name = document.getElementById("name").value;
    phone = document.getElementById("phone").value;
    if(name=='' || phone =='')
    {
      success("Name & Phone no. are mandatory");
      return;
    }
        console.log(name);
    db.deleteData(name,phone,success);
    document.getElementById("form").reset();
}

function testingRollback(event) {
    event.preventDefault() // stop the form from add1itting
    console.log("CALLEDRO");
    db.testRollback(success);
}

function testingCommit(event) {
    event.preventDefault() // stop the form from add1itting
    console.log("CALLEDCO");
    db.testCommit(success);
}


function viewData()
{
  event.preventDefault() // stop the form from add1itting
  db.displayData("",viewDataCallback);
}

function printData()
{
  event.preventDefault() // stop the form from add1itting
  document.getElementById("body").style.display = "none";
  document.getElementById("printBtn").style.display = "none";
  window.print();
  document.getElementById("body").style.display = "block";
  document.getElementById("printBtn").style.display = "block";
}


function viewSearchData()
{
  event.preventDefault() // stop the form from add1itting
  name = document.getElementById("name").value;
  phone = document.getElementById("phone").value;

  console.log(name);
  var whereClause = `where name='${name}' or phone='${phone}'`; //+ 'or phone=' + phone;
  db.displayData(whereClause,viewDataCallback);
  document.getElementById("form").reset();
}

function viewDataCallback(result)
{

  var users = result.recordset;
  console.log(users);
  var html = '<table>'

  setTimeout(function () {
      for(var i = 0; i < result.rowsAffected[0]; i++) {
          html += '<tr>'
          html += '<td>' + users[i].name + '</td>'
          html += '<td>' + users[i].add1 + '</td>'
          html += '<td>' + users[i].add2 + '</td>'
          html += '<td>' + users[i].district + '</td>'
          html += '<td>' + users[i].phone + '</td>'
          html += '</tr>'
      }

      document.getElementById("table").innerHTML = html
  }, 500)
}


//db.displayData(selectResult);
//db.insertData("testfunction","testfunction","testfunction","testfunction","testfunction", success);
//db.displayData(selectResult);
//db.insertData("testing","testfunction","testfunction","testfunction","testfunct", success);
//db.displayData("where name='testing'", selectResult);
//db.deleteData(success);
//db.displayData(selectResult);
//prototype: db.updateData(name, mob, newAdd1, newAdd2, newDistrict, success);
//db.updateData('testing', 'testfunct', "fEWww", "feWww", "fEWww", success);
