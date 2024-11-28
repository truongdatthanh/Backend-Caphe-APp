import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema()
export class Cart {

    @Prop({type: Types.ObjectId, ref: 'User'})
    userId: Types.ObjectId;

    @Prop({
        type: [
          {
            productId: { type: String, required: true },
            quantity: { type: Number, required: true, default: 1 },
          },
        ],
        required: true,
        default: [],
      })
      items: { productId: string; quantity: number }[];
    
}


export const CartSchema = SchemaFactory.createForClass(Cart);