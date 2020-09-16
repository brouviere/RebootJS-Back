import { Document, Schema, model, Model} from 'mongoose';

export interface IMessage extends Document {
  targets: string[];
  conversationId: string;
  emitter: string;
  content: string;
  created: Date;
}

const messageSchema = new Schema({
  targets: {
    type: Schema.Types.ObjectId,
    ref: 'profile',
    required: true
  },
  conversationId: {
    type: String,
    required: true
  },
  emitter: {
    type: Schema.Types.ObjectId,
    ref: 'profile',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  created: {

  }
});

const Message = model<IMessage, Model<IMessage>>('message', messageSchema);

export default Message;