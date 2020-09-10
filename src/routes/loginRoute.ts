import { Router, Request, Response } from "express";
import passport from "passport";
import { IProfile } from "../models/Profiles";
import { ProfileNotFoundError } from "../controllers/authenticationController";


const router = Router();

router.post('/', (req: Request, res: Response) => {
  passport.authenticate('local', (err, profile: IProfile) => {
    if(err) { 
      if(err instanceof ProfileNotFoundError) {
        return res.status(404).send('Profile not found');
      } else {
        return res.status(500).send('An error has occured'); 
      }
    }
      
    if(profile) {
      // CREATE A SESSION
      req.logIn(profile, (err) => {
        if(err) { 
          return res.status(500).send('Session error')
        };
        return res.send(profile.getSafeProfile());
      });
    } else {
      return res.status(401).send('No profile found with these credentials');
    }
  })(req, res);
})


export default router;