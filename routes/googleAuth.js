var express = require("express");
const passport = require('passport');
var userModel = require("../models/users");
var router = express.Router();

//google Oauth routes
router.get("/auth/google",
  passport.authenticate("google", {accessType: 'offline', prompt: 'consent', scope: ["profile", "email"] })
);

router.get("/auth/google/callback",
  passport.authenticate("google", {accessType: 'offline', prompt: 'consent', failureRedirect: "/", session: true }),
  function(req, res) {
    var token = req.user.token;

    //if new user, add them to database, either way redirect to client
    userModel.find({userEmail: req.user.email}, function(err, users){
            if(err){
              var err = new Error("Error: userModel.find() error");
              err.statusCode = 500;
              next(err);
            }
        if(users.length == 0)
        {
          console.log("new user");
          var newUser = new userModel({userEmail: req.user.email, userName: req.user.name, homeCourtlocationID: 0000 });
          newUser.save(function (err) {
          if(err){
              var err = new  Error("Error in creating new user ");
              err.statusCode = 500;
              next(err);
            }
          });
        } 
        else
        {
              console.log("old user");
        }
      })

    res.redirect("http://pdxpickup.herokuapp.com");
  }
);

module.exports = router;