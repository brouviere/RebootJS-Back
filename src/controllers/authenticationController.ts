import passport from "passport";
import { Strategy } from "passport-local";
import Profile from "../models/Profiles";



passport.use(
  new Strategy((username: string, password: string, done) => {
    try {
      Profile.findOne({email: username}, null, (err, profile) => {
        if(err) { return done(err); }
        if(profile) {
          const isPasswordCorrect = profile.verifyPassword(password);
          if(isPasswordCorrect) { return done(null, profile) }
        }
        return done(new Error('Profile not found'));
      })
    } catch (error) {
      done(error);
    }
  })
)