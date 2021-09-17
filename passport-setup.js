const passport = require("passport")
const config = require("config")
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
  clientID: config.get("CLIENT_ID_FACEBOOK"),
  clientSecret: config.get("CLIENT_SECRET_FACEBOOK"),
    callbackURL: `${config.get("API_URL")}/auth/facebook/callback`
  },
  function(accessToken, refreshToken, profile, done) {
      done(null, profile);
  }
));
passport.use(new GoogleStrategy({
    clientID: config.get("CLIENT_ID_GOOGLE"),
    clientSecret: config.get("CLIENT_SECRET_GOOGLE"),
    callbackURL: `${config.get("API_URL")}/auth/google/callback`
  },
  function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
  }
));
passport.serializeUser((user,done)=>{
  done(null,user)
})
passport.deserializeUser((user,done)=>{
  done(null,user)
})
