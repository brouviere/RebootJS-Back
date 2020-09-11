import { Router, Request, Response } from 'express';
import Profile from '../models/Profiles';
import profilesController from '../controllers/profilesController';
import authenticationRequired from '../middlewares/authenticationRequired';

const router = Router();

router.get('/:id', authenticationRequired, async (req: Request, res: Response) => { 
  const profileId = req.params['id'];
  const profile = await profilesController.findById(profileId);

  if(profile == null) { console.log('No profile found') }

  res.send(profile);
});

router.get('/', (req: Request, res: Response) => {
  const skip: number = req.query.skip ? +req.query.skip : 0;
  const limit: number = req.query.limit ? +req.query.limit : 3;
  Profile.find({}, '_id email firstname lastname').skip(skip).limit(limit)
    .then(profiles => {
      return res.status(200).send(profiles);
    })
    .catch(error => {
      return res.status(500).send();
    })
})

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