const express=require('express');
const mongoose =require('mongoose');
const exphbs=require('express-handlebars');
const Handlebars=require('handlebars');
const bodyParser=require('body-parser');
const methodOverride=require('method-override');
const flash=require('connect-flash');
const session=require('express-session');
const {PORT, MONOG_URL} = require('./config');
const { data } = require('jquery');

const app=express();

mongoose.connect(MONOG_URL, { useNewUrlParser: true  , useUnifiedTopology: true } , err => {
    if(err) throw err;
    console.log('MongoDB connected')
})

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

app.engine('handlebars', exphbs());
app.set('view engin', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

Handlebars.registerHelper("removeFirst6char", (str)=>{
    let removeChar= [...str].splice(6).join("");
    return new Handlebars.SafeString(removeChar);
})

//======method_overide start==============
app.use(methodOverride('_method'));
//======method_overide end==============

//======sesseion start==============
app.use(session({
    secret:"secret",
    resave:true,
    saveUninitialized:true,
}));
app.use(flash());
//======sesseion end==============

//======sesseion start==============
app.use(function(req, res, next){
    // res.locals.time=new Date().toLocaleTimeString();
    res.locals.success_msg=req.flash("success_msg");
    res.locals.warning_msg=req.flash("warning_msg");
    res.locals.error_msg=req.flash("error_msg");
    next();
})
//======sesseion end==============

app.get('/',(req,res)=> {
    res.render('./home.handlebars')
})

app.use('/auth/',require('./Router/auth/auth.js'));
app.use('/profile/',require('./Router/profile/profile.js'));

app.listen(PORT, err=> {
    if(err) throw err;
    console.log('server running on ',PORT)
}) 