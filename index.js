var express=require('express');
var login=require('./routes/loginroutes');
var user_d=require('./routes/user_dashboard');
var bodyParser=require('body-parser');
var app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views','./views');

var router=express.Router();
router.get('/', function(req, res) {
	console.log('base');
    res.send('welcome to our upload module apis' )

});
router.get('/register',login.registerg);

router.get('/login',login.loging);
router.get('/dashboard/:user_id',user_d.user_dashboard);

router.post('/register',login.register);
router.post('/login',login.login)
app.use('/',router);
module.exports=router;

app.listen(3000,()=>{
	console.log('server running.....')
});