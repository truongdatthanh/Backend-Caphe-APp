import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true })
export class Product {

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    price: number;

    @Prop()
    image: string;

    @Prop({type: Types.ObjectId, ref: 'Category'})
    categoryId: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);