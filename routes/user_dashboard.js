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
let string3;
exports.user_dashboard=function (req,res) {
	// body...
var user_id=req.params.user_id;
	connection.query('SELECT * FROM users WHERE id = ?',[user_id], function (error, results, fields) {
    if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    var string=results[0].first_name;
    //var string2 = decodeURIComponent(escape(string))
   /*return text.replace(/\\u[\dA-F]{4}/gi, 
          function (match) {
               return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
          });
}*/
    string3=string;
    res.send('welcome to your dashboard , '+string3);
    
  }
  });

	
}