const passport = require("passport");
const googleStategy = require("passport-google-oauth20");
const config = require('app/configs/config');
const status = require('app/configs/status');

passport.use(
  new googleStategy(
    {
      clientID:config.clientID,
      clientSecret: config.clientSecret,
      callbackURL:config.callbackURL
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log(accessToken);
      // console.log(profile);
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);


passport.serializeUser(function(user, done) {
  done(null, user.id);
 // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
      done(err, user);
  });
});
