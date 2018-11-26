var express = require("express");
var router = express.Router()
var sessionModel = require("../models/sessions");
const moment = require('moment');
const mongoose = require('mongoose');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); 
  }
  res.send([]); // send empty to avoid client side error
}


//get sessions
router.get('/api/sessions', (req, res) => {
	let queryLimit = 20; //default query limit
	let query = { };

	if(req.query.loc != "All" && parseInt(req.query.loc) >= 0)
	{
		query = {locationID: parseInt(req.query.loc)};
	}

	if(parseInt(req.query.num))
	{
		queryLimit = parseInt(req.query.num);
	}

	return sessionModel.find(query).sort([['sessionDate', 1]])
	.limit(queryLimit).exec(function(err, sessions){
         if(err){
              var err = new  Error("Error: sessionModel.find() ");
              err.statusCode = 500;
              next(err);
            }
   	res.send(sessions);
 	})

});

router.post('/api/sessions', ensureAuthenticated, function(req, res){
	console.log("Recieved!");
	console.log(req.body);

  //dont create sessions that have already passed
	if(moment(req.body.dateTime).isAfter())
	{
		//add to database
		var newSession = new sessionModel({ sessionName: req.body.sessionName, sessionPop: req.body.attendesInParty, 
			locationID: req.body.parkLocation , sessionOwnerEmail: req.body.userEmail, sessionDate: moment(req.body.dateTime)});
		  newSession.save(function (err) {
         if(err){
              var err = new  Error("Error: newSession.save");
              err.statusCode = 500;
              next(err);
            }
          console.log(newSession);
   		//saved!
		});
	}
});


//add a user to a session
router.put('/api/sessions/add', ensureAuthenticated, function(req, res){
	console.log("at add user to session!");
	let sessionID = req.body[0]._id;
	var id = mongoose.Types.ObjectId(sessionID);

	sessionModel.findOne({_id: id}, function(err, sessions){
        if(err){
          var err = new  Error("Error: sessionModel.findOne(): add user to session ");
          err.statusCode = 500;
          next(err);
        }
      //add email to users and tick up attending count, unless owner is same email
      if(sessions.sessionOwnerEmail == req.body[1]){
        console.log("This user owns the game!");
      }
      else{
        if(sessions.sessionAttendes.indexOf(req.body[1]) == -1){
        	sessions.sessionAttendes.push(req.body[1]);
        	sessions.sessionPop += 1;
        	console.log("added user to session");
        	sessions.save();
        }
        else{
        	console.log("user already in session");       		
        }
      }
    });	
});

//removes a user from a session
router.put('/api/sessions/remove', ensureAuthenticated, function(req, res){
	console.log("Got to remove Ateendee!");
	let sessionID = req.body[0]._id;
	var id = mongoose.Types.ObjectId(sessionID);

	sessionModel.findOne({_id: id}, function(err, sessions){
        if(err){
          var err = new  Error("Error: sessionModel.findOne(): remove user to session ");
          err.statusCode = 500;
          next(err);
        }
        	let index = sessions.sessionAttendes.indexOf(req.body[1]);
        	console.log(req.body);
          if(index > -1){
        		sessions.sessionAttendes.splice(index, 1);;
        		sessions.sessionPop -= 1;
        		console.log("removed user from session");
        		sessions.save();
        	}
        	else{
        	console.log("couldnt find user in session!");
        	}
    });	
});

router.delete('/api/sessions/delete', ensureAuthenticated, function(req, res){
	let sessionID = req.body._id
	var id = mongoose.Types.ObjectId(sessionID);

	sessionModel.deleteOne({_id: id}, function(err){
    if(err){
      console.log(err);
    }
    console.log("removed!");
  });
});

module.exports = router;