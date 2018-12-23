var express = require('express');
var router = express.Router();
var User = require('../models/user');

// Register
router.get('/register', function(req,res){
  res.render('register');
});

// Login
router.get('/login', function(req,res){
  res.render('login');
});

// Register post
router.post('/register', function(req,res){
   var name = req.body.name;
   var email = req.body.email;
   var username = req.body.username;
   var password = req.body.password;
   var confirmpassword = req.body.password2;

   //validations
   req.checkBody('name','Name is required').notEmpty();
   req.checkBody('email','Name is required').notEmpty();
   req.checkBody('email','email is not valid').isEmail();
   req.checkBody('username','Username is required').notEmpty();
   req.checkBody('password','password is required').notEmpty();
   req.checkBody('password2','passwords do not match').equals(req.body.password);

   var errors = req.validationErrors();

   if(errors){
     res.render('register',{
       errors:errors
     });
   }else{
      var newUser = new User({
          name : name,
          email: email,
          username:username,
          password:password
      });
      User.createUser(newUser,function(err,user){
          if(err) throw err;
          console.log(user);
      });
      req.flash('sucess_msg','your are registered you can login now');
      res.redirect('/users/login');
    }
});

module.exports = router;
