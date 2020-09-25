import { Router, Request, Response } from 'express';
import messagesController from '../controllers/messagesController';
import authenticationRequired from '../middlewares/authenticationRequired';
import Profile, { IProfile } from '../models/Profiles';
import { io } from "../socket";

const router = Router();

router.get('/', authenticationRequired, async (req: Request, res: Response) => {
  if(!req.user) { return res.status(401).send('You must be authenticated')};
  return res.json(await messagesController.getAllMessages(req.user as IProfile));
});

router.get('/:conversationId', authenticationRequired, async (req: Request, res: Response) => {
  if(!req.user) { return res.status(401).send('You must be authenticated')};
  return res.json(await messagesController.getAllMessages(req.user as IProfile, req.params['conversationId']));
});

router.post('/', authenticationRequired, async (req: Request, res: Response) => {
  if(!req.user) { return res.status(401).send('You must be authenticated')};
  const { conversationId, targets, content } = req.body;
  const newMessage = await messagesController.createMessage(req.user as IProfile, conversationId, targets, content);

  res.json(newMessage);

  return await Promise.all(
    newMessage.targets.map(async (target) => {
      const profile = await Profile.findById(target)
      const socketId = profile?.socket;
      if(socketId){
        console.log('new message for', profile?.firstname);
        io.to(socketId).emit('chat-message', newMessage.toJSON())
      }
    })
  )
});

export default router;