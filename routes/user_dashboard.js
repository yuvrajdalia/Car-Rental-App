var mysql      = require('mysql');
var geodist = require('geodist')
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

    string3=string;
    
  }
  });

  

  /*connection.query('SELECT * FROM bookings WHERE user_id = ?',[user_id], function (error, results, fields) {
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
  
  */
  

  res.render('user_dashboard',{x:string3,user_id:user_id});

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

  console.log(startf,endf);
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
  var long=req.body.long;
  var lat=req.body.lat;
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

  }
  });
  connection.query('SELECT * from centers', function(error,results,fields){
    if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    console.log(results);
    var min=999999;
    var number;
    var phn;
    var address;
    results.forEach(function(element){
      var min_dist=geodist({lat:lat,lon:long},{lat:element.x_co,lon:element.y_co});
      if(min_dist<min){
        min=min_dist;
        number=element.no;
        phn =element.manager_no;
        address=element.address;
      }
    })
    console.log(min,phn,address);
    res.render('booked',{min:min,phn:phn,address:address,user_id:user_id})

  }
  });


}



exports.admindashboard =function (req,res) {
  // body..
  //var today=new Date();
  //var year=today.getFullYear();
  //var month=today.getMonth()+1
  //var dat=today.getDate()
  //var date = year.toString()+'-'+month.toString()+'-'+dat.toString();
  //var ed=today.slice(11,17);
  //var dt=st+" "+ed

/*connection.query('SELECT * FROM bookings where start > ?',[date], function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    //console.log("------------");
    //console.log(date);
    adminupcoming_bookings=results;
    console.log('The solution is: ', results);

  }
  })
connection.query('SELECT * FROM bookings where end < ?',[date], function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    //console.log("------------");
    //console.log(date);
    adminprevious_bookings=results;
    console.log('The solution is: ', results);

  }
  })
  */
//console.log(adminupcoming_bookings,adminprevious_bookings);
  res.render('admindashboard');


}
exports.adminupcoming =function (req,res) {
  // body..
  var today=new Date();
  var year=today.getFullYear();
  var month=today.getMonth()+1
  var dat=today.getDate()
  var date = year.toString()+'-'+month.toString()+'-'+dat.toString();
  //var ed=today.slice(11,17);
  //var dt=st+" "+ed

connection.query('SELECT * FROM bookings where start > ?',[date], function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    //console.log("------------");
    //console.log(date);
    //results;
    console.log('The solution is: ', results);
    res.render('adminupcoming',{bookings:results});

  }
  })
/*connection.query('SELECT * FROM bookings where end < ?',[date], function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    //console.log("------------");
    //console.log(date);
    adminprevious_bookings=results;
    console.log('The solution is: ', results);

  }
  })
  */
//console.log(adminupcoming_bookings,adminprevious_bookings);



}
exports.adminprevious = function (req,res) {
  // body...
  var today=new Date();
  var year=today.getFullYear();
  var month=today.getMonth()+1
  var dat=today.getDate()
  var date = year.toString()+'-'+month.toString()+'-'+dat.toString();
  //var ed=today.slice(11,17);
  //var dt=st+" "+ed

connection.query('SELECT * FROM bookings where end <  ?',[date], function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    //console.log("------------");
    //console.log(date);
    //results;
    console.log('The solution is: ', results);
    res.render('adminprevious',{bookings:results});

  }
  })
}
exports.deletebooking = function (req,res) {
  // body...
  var number = req.body.booking_no;
  connection.query('delete from bookings where no=?',[number], function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    //console.log("------------");
    //console.log(date);
    //results;
    console.log('deleted');
  }
  })
}
exports.viewbooking=function (req,res) {
  // body...
  var number=req.body.booking_no;
  console.log(number);
  connection.query('select bookings.no,bookings.start,bookings.end,bookings.reg_no,users.first_name,users.last_name,users.phone_no from bookings,users where bookings.no=? and users.id=(select user_id from bookings where bookings.no=?)',[number,number], function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    //console.log("------------");
    //console.log(date);
    //results;
    console.log('The solution is: ', results[0].reg_no);
    //res.render('adminupcoming',{bookings:results});
    res.render('viewbooking',{results:results[0]});
  }
  })
}


exports.userupcoming =function (req,res) {
  // body..
  var id=req.body.user_id
  console.log(id);
  var today=new Date();
  var year=today.getFullYear();
  var month=today.getMonth()+1
  var dat=today.getDate()
  var date = year.toString()+'-'+month.toString()+'-'+dat.toString();

connection.query('SELECT * FROM bookings where start > ? and user_id=?',[date,id], function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    //console.log("------------");
    //console.log(date);
    //results;
    //console.log('The solution is: ', results);
    res.render('userupcoming',{bookings:results});

  }
  })
/*connection.query('SELECT * FROM bookings where end < ?',[date], function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    //console.log("------------");
    //console.log(date);
    adminprevious_bookings=results;
    console.log('The solution is: ', results);

  }
  })
  */
//console.log(adminupcoming_bookings,adminprevious_bookings);



}
exports.userprevious = function (req,res) {
  // body...
  var user_id=req.body.user_id
  console.log(user_id);
  var today=new Date();
  var year=today.getFullYear();
  var month=today.getMonth()+1
  var dat=today.getDate()
  var date = year.toString()+'-'+month.toString()+'-'+dat.toString();

connection.query('SELECT * FROM bookings where end <  ? and user_id=?',[date,user_id], function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    //console.log("------------");
    //console.log(date);
    //results;
    //console.log('The solution is: ', results);
    res.render('userprevious',{bookings:results,user_id:user_id});

  }
  })
}
exports.giverating = function (req,res) {
  // body...
  var reg_no=req.body.reg_no;
  var user_id=req.body.user_id;
  var booking_no=req.body.no;
  console.log(req.body);
  var rating=parseFloat(req.body.rating);
  console.log(reg_no,rating);
  connection.query('SELECT rating from vehicle where reg_no= ?',[reg_no], function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    //console.log("------------");
    //console.log(date);
    //results;
    console.log('The solution is: ', results);
    var rating2=parseFloat(results[0].rating);
    //console.log(rating2);
    rating=(rating+rating2)/2;
    //console.log(rating);
    connection.query('update vehicle set rating= ? where reg_no= ?',[rating,reg_no], function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    //console.log("------------");
    //console.log(date);
    //results;
    //console.log('The solution is: ', results);
    console.log(booking_no);
    connection.query('update bookings set rating_status=1 where no= ?',[booking_no], function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    //console.log("------------");
    //console.log(date);
    //results;
    //console.log('The solution is: ', results);
    res.redirect("/dashboard/"+user_id);
    
  

  }
  })
  

  }
  })
  

  }
  })

}
