
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true })
export class Purchased
{
    @Prop()
    date: string;

    @Prop()
    paymentOption: string;

    @Prop({type: Types.ObjectId, ref: 'User'})
    userId: Types.ObjectId;

    @Prop({type: Types.ObjectId, ref: 'Cart'})
    cartId: Types.ObjectId;

    @Prop()
    address: string;

    @Prop()
    total: number;
 }


 export const PurchasedSchema = SchemaFactory.createForClass(Purchased);