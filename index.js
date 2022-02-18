var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql2');
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'renil5332',
    database : 'security_module_db'
  });
   
   
  connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected with mysql database...')
  })

  var server = app.listen(3000, "127.0.0.1", function () {

    var host = server.address().address
    var port = server.address().port
  
    console.log("Example app listening at http://%s:%s", host, port)
  
  });

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//rest api to get all security personnel
app.get('/securitypersonnel', function (req, res) {
   connection.query('select * from securitypersonnel', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//get specific record
app.get('/securitypersonnel/:id', function (req, res) {
  connection.query('select * from securitypersonnel where sec_id=?', [req.params.id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

app.post('/securitypersonnel', function (req, res) {
  var params  = req.body;
  console.log(params);
  connection.query('INSERT INTO securitypersonnel SET ?', params, function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
