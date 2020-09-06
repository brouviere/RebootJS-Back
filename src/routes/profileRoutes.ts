import { Router, Request, Response } from 'express';
import Profile from '../models/Profiles';
import profilesController from '../controllers/profilesController';

const router = Router();

router.get("/", async (req: Request, res: Response) => {

  const profiles = await profilesController.find();
  
  if(profiles == null) { console.log('No profiles.') }

  res.send(profiles);
});

router.get('/:id', async (req: Request, res: Response) => { 
  const profileId = req.params['id'];
  const profile = await profilesController.findById(profileId);

  if(profile == null) { console.log('No profile found') }

  res.send(profile);
});

router.post('/', async (req: Request, res: Response) => {
  const newProfile = await profilesController.create(req.body);

  res.status(200).send(newProfile);
});

router.patch('/:id', async (req: Request, res: Response) => {
  const profileId = req.params['id'];
  // const {email, firstname, lastname} = req.body;

  const updatedProfile = await profilesController.findByIdAndUpdate(profileId, req.body)
  res.send('User updated');
})

router.delete('/:id', (req: Request, res: Response) => {
  const profileId = req.params['id'];

  const profileDeleted = profilesController.findByIdAndDelete(profileId);
  res.status(200).send('User deleted !');
})

export default router;