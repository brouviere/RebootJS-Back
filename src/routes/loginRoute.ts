import { Router, Request, Response } from "express";
import passport from "passport";


const router = Router();

router.post('/', (req: Request, res: Response) => {
  passport.authenticate('local', (err, profile) => {
    console.log('Authenticating...');
    if(err) { return res.status(500).send('An error has occured'); }
    if(profile) {
      // TODO
      // CREATE A SESSION
      console.log('User succesfully logged in');
      return res.send(profile);
    } else {
      return res.status(401).send('No profile found with these credentials');
    }
  });
})


export default router;