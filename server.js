const express = require('express');
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const moment = require('moment');
const path = require('path');
  
//--mongoose setup
var options = { keepAlive: 300000, connectTimeoutMS: 30000, useNewUrlParser: true};

mongoose.connect(process.env.MONGODB_URI, options);
const db = mongoose.connnection;

let sessionModel = require("./models/sessions");

//--app setup
const app = express();
const port = process.env.PORT || 5000;



//body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//store
var store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'mySessions'
});

//--passport
app.use(require("express-session")({
  secret: "Oscar is my favorite cat!",
  resave: false,
  saveUninitialized: false,
  cookie: {expires: new Date(253402300000000)},
  store: store,
}));
app.use(passport.initialize());
app.use(passport.session());



//--server functions

//clears games that have start times past current time
function clearOldGames() {
  sessionModel.find({}, function(err, sessions){
    var now = moment();
    if(err){
      console.log(err);
    }
    else{
      for(let i = 0; i < sessions.length; i++){ 
        //if session start has passed, delete
        if(moment(sessions[i].sessionDate).isBefore(moment())){

 
          let sessionID = sessions[i]._id
          var id = mongoose.Types.ObjectId(sessionID);

          sessionModel.deleteOne({_id: id}, function(err){
            if(err){
                 var err = new Error("Error in function: clearOldGames ");
                  err.statusCode = 401;
                  next(err);
            }

          });
        }
            
      }

    }
  }); 
}

//routes
var auth = require("./routes/passport");
var sessionsRoutes = require("./routes/sessions");
var googleRoutes = require("./routes/googleAuth");
var usersRoutes = require("./routes/users");
var locationsRoutes = require("./routes/locations");

app.use(sessionsRoutes);
app.use(googleRoutes);
app.use(usersRoutes);
app.use(locationsRoutes);


app.listen(port, function()
{
  console.log("listening");
  //clear old games on start up
	clearOldGames();
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// /logout
app.post('/api/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      }
    });
  }
});


app.use(function(err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500; 
  res.status(500).end();
});