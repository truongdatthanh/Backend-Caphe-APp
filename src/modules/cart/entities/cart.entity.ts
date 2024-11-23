import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema()
export class Cart {

    @Prop({type: Types.ObjectId, ref: 'User'})
    userId: Types.ObjectId;

    @Prop({type: Types.ObjectId, ref: 'Product'})
    productId: Types.ObjectId;

    @Prop()
    quantity: number;
}


export const CartSchema = SchemaFactory.createForClass(Cart);