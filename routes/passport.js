var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;



passport.serializeUser(function(user, done) {
 done(null, user);

});

passport.deserializeUser(function(user, done) {
 done(null, user);
});

passport.use(
 new GoogleStrategy(
  {
   clientID: "951353572797-qfvvcuapt34oi9jgcmrbsehvsn976m4h.apps.googleusercontent.com",
   clientSecret: "qJIDjGisNJnkOi8U6GY-x7BL",
   callbackURL: "http://pdxpickup.herokuapp.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
   var userData = {
    email: profile.emails[0].value,
    name: profile.displayName,
    id: profile.id,
    token: accessToken,
    refreshToken: refreshToken,
   };
   console.log(userData);
   done(null, userData);
  }
 )
);

