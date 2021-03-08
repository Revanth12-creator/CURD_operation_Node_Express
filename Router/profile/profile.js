const express=require('express');
const router=express.Router();

// const Profile=require('../../Model/profile.js');

const multer=require('multer');
let {storage}=require('../../config/multer.js');
const Profile = require('../../Model/profile.js');
let upload=multer({storage})



router.get('/addProfile',(req,res)=> {
    res.render('./Profiles/addProfile.handlebars')
})


router.post('/createProfile',upload.single("photo"),(req,res)=> {
    let {
        photo,
        firstname,
        lastname,
        designation,
        phone,
        gender,
        address,
        alt_address,
        country,
        state ,
        city,
        pincode,
        landmark,
    }= req.body;
        
    let newProfile = {
        photo:req.file,
        firstname,
        lastname,
        designation,
        phone,
        gender,
        address,
        alt_address,
        country,
        state,
        city,
        pincode,
        landmark,
    };

       new Profile(newProfile).save()
       .then((profile)=>{
        req.flash("success_msg", "SuccessFully Created Profile")
        res.redirect('/profile/allProfiles',200, {profile})
       })
       .catch(err=> {
        console.log(err)
       })

    console.log(req.body);
})

router.get('/allProfiles',(req,res)=> {
    Profile.find({}).sort({data:"desc"}).lean()
    .then((profiles)=> {
        res.render('./Profiles/allProfiles.handlebars', {profiles})
    })
    .catch(err => console.log(err))
})



router.get('/userDetails/:id',(req,res)=> {
    const id=req.params.id;
    Profile.findOne({_id:id}).lean()
    .then((userId)=> {
        res.render('./Profiles/userDetails.handlebars', {userId});
    })
    .catch(err=> console.log(err))
})

router.put('/updateUser/:id',upload.single('photo'),(req,res)=> {
    Profile.findOne({_id:req.params.id})
    .then((editUser)=> {
        editUser.photo=req.file;
        editUser.firstname=req.body.firstname;
        editUser.lastname=req.body.lastname;
        editUser.designation=req.body.designation;
        editUser.phone=req.body.phone;
        editUser.gender=req.body.gender;
        editUser.address=req.body.address;
        editUser.alt_address=req.body.alt_address;
        editUser.country=req.body.country;
        editUser.city=req.body.city;
        editUser.state=req.body.state;
        editUser.landmark=req.body.landmark;

        editUser.save()
        .then((update)=> {
            req.flash("success_msg", "SuccessFully  Edited Profile")
            res.redirect('/profile/allProfiles',200,{update})
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})


router.get('/editUser/:id',(req,res)=> {
    Profile.findOne({_id:req.params.id}).lean()
    .then((edit)=> {
        res.render('./Profiles/editDetails.handlebars',{edit})
    })
    .catch(err => console.log(err))
})


router.delete("/deleteUser/:id", (req, res) => {
    Profile.deleteOne({_id : req.params.id})
    .lean()
    .then((delete_profile) => {
    req.flash("success_msg", "SuccessFully Deleted Profile")
      res.redirect("/profile/allProfiles",201);
    })
    .catch(err => console.log(err))
  });  

module.exports=router;