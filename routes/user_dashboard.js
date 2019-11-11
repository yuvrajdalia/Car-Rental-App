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
let upcoming_bookings=[];
let previous_bookings=[];
exports.user_dashboard=function (req,res) {
  console.log("hit");
	// body...
var abc;
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
    //res.render('user_dashboard',{x:string3,user_id:user_id});
    
  }
  });

  

  connection.query('SELECT * FROM bookings WHERE user_id = ?',[user_id], function (error, results, fields) {
    if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    
    console.log(results[0].start,results[0].end);
    results.forEach( function (result) {
      var today = new Date();
      if(today>result.end){
        console.log(222);
        previous_bookings.push(result);
      }
      else if(today<result.start){
        upcoming_bookings.push(result);
      }
      
    }) 
 
    //console.log(previous_bookings);
  }
  
  });
  
  
  
  console.log(previous_bookings);
	previous_bookings.forEach(function(booking) {
    // body...
    console.log(11);
    console.log(booking.reg_no);
  });
  res.render('user_dashboard',{x:string3,user_id:user_id,upcoming_bookings:upcoming_bookings,previous_bookings:previous_bookings});

}
exports.vehicle_search=function (req,res) {
  // body..
  var user_id=req.body.id;
  var start=req.body.start;
  var end=req.body.end;
  var start1=start.slice(0,10);
  var start2=start.slice(11,16)
  var startf=start1+" "+start2+":00";
  var end1=end.slice(0,10);
  var end2=end.slice(11,16)
  var endf=end1+" "+end2+":00";
  //console.log(startf,endf);
  connection.query('select * from vehicle where reg_no NOT IN (select reg_no from bookings where start BETWEEN ? AND ?)',[startf,endf], function (error, results, fields) {
    if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    console.log(results[0]);
    console.log(user_id);
    //console.log(results[0].model);

    res.render('searchresults',{results:results,user_id:user_id,start:startf,end:endf})
    
  }
  });

}
exports.makebooking =function (req,res) {
  // body..
  var user_id=req.body.id;
  var reg_no=req.body.reg_no;
  var start=req.body.start;
  var end=req.body.end;
  console.log(user_id,reg_no,start,end);

  var bookings={
    "start":req.body.start,
    "end":req.body.end,
    "reg_no":req.body.reg_no,
    "user_id":req.body.id,
  }
  connection.query('INSERT INTO bookings SET ?',bookings, function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    console.log('The solution is: ', bookings);
    res.send({
      "code":200,
      "success":"user registered sucessfully"
        });
  }
  });

}
