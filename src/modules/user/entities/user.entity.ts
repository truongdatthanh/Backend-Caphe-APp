import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true })
export class User {
    _id: Types.ObjectId;

    @Prop()
    username: string;

    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    status: boolean;

    @Prop()
    phoneNumber: string;

    @Prop()
    address: string;

    @Prop()
    avatar: string;

    @Prop({default: 'user'})
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);