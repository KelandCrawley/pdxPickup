var express = require("express");
var userModel = require("../models/users");
var router = express.Router();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); 
  }
  res.send([]); // send empty to avoid client side error
}


//get current logged in user info
router.get('/api/users', ensureAuthenticated, function(req, res){
		userModel.findOne({userEmail: req.session.passport.user.email}, function(err, users){
        if(err){
          var err = new  Error("Error: userModel.findOne() ");
          err.statusCode = 500;
          next(err);
        }
  			let result = [];
				result.push(users); 
				res.send(result);
   		});

});

//updates current users home court
router.put('/api/users/homecourt', ensureAuthenticated, function(req, res){
	console.log(Number(req.body[0]));
	userModel.findOne({userEmail: req.session.passport.user.email}, function(err, users){
      if(err){
        var err = new  Error("Error: userModel.findOne() ");
        err.statusCode = 500;
        next(err);
      }
			users.homeCourtlocationID = req.body[0];
			users.save();
  });
});

module.exports = router;