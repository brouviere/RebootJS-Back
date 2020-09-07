import { Router, Request, Response } from "express";
import passport from "passport";


const router = Router();

router.post('/', (req: Request, res: Response) => {
  passport.authenticate('local', (err, profile) => {
    if(err) { return res.status(500).send('An error has occured'); }
    if(profile) {
      // TODO
      // CREATE A SESSION
    } else {
      return res.status(401).send('No profile found with these credentials');
    }
  })
})


export default router;