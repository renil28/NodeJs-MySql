var express = require('express');
// Create the app
var app = express();

// File System for loading the list of employees 
var fs = require('fs');

// This is for hosting files
app.use(express.static('public'));

// is "additional.json", check first to see if it exists
var security;
var exists = fs.existsSync('security.json');
if (exists) {
  // Read the file
  console.log('Loading Employees');
  var txt = fs.readFileSync('security.json', 'utf8');
  // Parse it  back to object
  security = JSON.parse(txt);
} else {
  // Otherwise start with blank list
  console.log('No security');
  security = {};
}

// Set up the server
var server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

// A route for adding a new emp with a sal
app.get('/add/:emp/:sal', addEmp);

// Handle that route
function addEmp(req, res) {
  // emp and sal
  var emp = req.params.emp;
  // Make sure it's not a string by accident
  var sal = Number(req.params.sal);

  // Put it in the object
  security[emp] = sal;

  // Let the request know it's all set
  var reply = {
    status: 'success',
    emp: emp,
    sal: sal
  }
  console.log('adding: ' + JSON.stringify(reply));

  // Write a file each time we get a new emp
  // This is kind of silly but it works
  var json = JSON.stringify(security, null, 2);
  fs.writeFile('security.json', json, 'utf8', finished);
  function finished(err) {
    console.log('Finished writing security.json');
    // Don't send anything back until everything is done
    res.send(reply);
  }
}

// Route for sending all the data related to employees and their salary
app.get('/all', showAll);

// Callback
function showAll(req, res) {
  // Send the entire dataset
  // express automatically renders objects as JSON
  res.send(security);
}