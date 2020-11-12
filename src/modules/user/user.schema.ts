import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop()
  messenger_id: string;

  @Prop()
  first_name: string;

  @Prop()
  gender: string;

  @Prop()
  image_url: string;

  @Prop()
  last_name: string;

  @Prop()
  locale: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
