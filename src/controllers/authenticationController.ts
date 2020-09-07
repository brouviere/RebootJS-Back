import passport from "passport";
import { Strategy } from "passport-local";
import Profile from "../models/Profiles";
import { Handler } from "express";

passport.use(
  new Strategy((username: string, password: string, done) => {
    try {
      Profile.findOne({email: username}, null, (err, profile) => {
        if(err) { return done(err); }
        if(profile) {
          return done(null, profile.verifyPassword(password) ? profile : null) 
        }
        return done(new Error('Profile not found'));
      })
    } catch (error) {
      done(error);
    }
  })
)

export const authenticationInitialize = (): Handler => passport.initialize(); 