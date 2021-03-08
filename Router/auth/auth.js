const express=require('express');
const router=express.Router();
router.get('/login',(req,res)=> {
    res.render('./Auth/login.handlebars')
})

router.get('/register',(req,res)=> {
    res.render('./Auth/register.handlebars')
})

module.exports=router;