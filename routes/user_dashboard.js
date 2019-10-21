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
    res.render('user_dashboard',{x:string3});
    
  }
  });

	
}
exports.vehicle_search=function (req,res) {
  // body..
  var start=req.body.start;
  var end=req.body.end;
  var start1=start.slice(0,10);
  var start2=start.slice(11,16)
  var startf=start1+" "+start2+":00";
  var end1=end.slice(0,10);
  var end2=end.slice(11,16)
  var endf=end1+" "+end2+":00";
  console.log(startf,endf);
  connection.query('select * from vehicle where reg_no NOT IN (select reg_no from bookings where start BETWEEN ? AND ?)',[startf,endf], function (error, results, fields) {
    if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    //console.log(results);
    //console.log(results[0].model);
    res.render('searchresults',{results:results})
    
  }
  });

}
