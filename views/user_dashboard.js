var mysql      = require('mysql');
var express=require('express');
var app=express();
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'yuvraj@1234',
  database : 'carlo'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});

exports.user_dashboard=function (req,res) {
	// body...
var user_id=req.query.valid;
	//req.session.valid=null;
console.log("jreeernrenree");
console.log(req.query);
	connection.query('SELECT * FROM users WHERE id = ?',[user_id], function (error, results, fields) {
    if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    // console.log('The solution is: ', results);
    console.log(results);
  }
  });

	res.send('welcome to  dashboard');
}