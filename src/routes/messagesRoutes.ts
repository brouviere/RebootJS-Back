import { Router, Request, Response } from 'express';
import messagesControllers from '../controllers/messagesControllers';
import authenticationRequired from '../middlewares/authenticationRequired';
import { IProfile } from '../models/Profiles';

const router = Router();

router.get('/', authenticationRequired, async (req: Request, res: Response) => {
  if(!req.user) { return res.status(401).send('You must be authenticated')};
  return res.json(await messagesControllers.getAllMessages(req.user as IProfile));
});

router.get('/:conversationId', authenticationRequired, async (req: Request, res: Response) => {
  if(!req.user) { return res.status(401).send('You must be authenticated')};
  return res.json(await messagesControllers.getAllMessages(req.user as IProfile, req.params['conversationId']));
});

router.post('/', authenticationRequired, async (req: Request, res: Response) => {
  if(!req.user) { return res.status(401).send('You must be authenticated')};
  const { conversationId, targets, content, emitter } = req.body;
  const newMessage = await messagesControllers.createMessage(req.user as IProfile, conversationId, targets, content);

  return res.json(newMessage);
});

export default router;