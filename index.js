var express=require('express');
var login=require('./routes/loginroutes');
var user_d=require('./routes/user_dashboard');
var bodyParser=require('body-parser');
var app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views','./views');
app.use(express.static("public"));
var router=express.Router();
router.get('/', function(req, res) {
	res.render('index');

});
router.get('/register',login.registerg);
router.get('/admindashboard',user_d.admindashboard);
router.get('/adminupcoming',user_d.adminupcoming);
router.get('/adminprevious',user_d.adminprevious);
router.post('/userupcoming',user_d.userupcoming);
router.post('/userprevious',user_d.userprevious);
router.get('/login',login.loging);
router.get('/dashboard/:user_id',user_d.user_dashboard);
router.post('/vehicle_search',user_d.vehicle_search);
router.post('/giverating',user_d.giverating);
router.post('/makebooking',user_d.makebooking);
router.post('/register',login.register);
router.post('/deletebooking',user_d.deletebooking);
router.post('/viewbooking',user_d.viewbooking);

router.post('/login',login.login)
app.use('/',router);
module.exports=router;

app.listen(3000,()=>{
	console.log('server running.....')
});