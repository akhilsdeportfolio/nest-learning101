import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Cat>;

@Schema()
export class Cat {
  @Prop({ default: '', required: true, type: String })
  name: string;

  @Prop({ default: 0, required: true, type: Number })
  age: number;

  @Prop({ default: 'n/a', required: true, type: String })
  breed: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
