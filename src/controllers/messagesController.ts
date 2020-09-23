import Message from "../models/Messages";
import { IProfile } from "../models/Profiles";

const find = async () => {
  try {
    const profiles = await Message.find({}).exec();
    return profiles;
  } catch (err) {
    return 'Error occured';
  }
}

const findById = async (id: string) => {
  try {
    const message = await Message.findById(id).exec();
    return message;
  } catch (error) {
    return 'Error occured'
  }
}

const getAllMessages = async(user: IProfile, conversationId?: string) => {
  try {
    const userId = user._id;
    const query: {$or: any, $and?: any} = {
      $or: [
        { emitter: userId },
        { targets: userId }
      ],
      $and: [{ conversationId: conversationId }]
    };

    if(!conversationId) { delete query.$and}

    return await Message.find(
      query,
      null,
      { sort: { createdAt: 1 } }
    )
  } catch (error) {
    throw new Error(error);
  }
}

const createMessage = async(user: IProfile, conversationId: string, targets: string[], content: string) => {
  try {
    const newMessage = new Message({
      conversationId: conversationId,
      targets: targets,
      emitter: user._id,
      content: content
    });

    newMessage.save();

    console.log('new message', newMessage);
    return newMessage;
  } catch (error) {
    throw new Error(error); 
  }
}

export = {
  find,
  findById,
  getAllMessages,
  createMessage
}