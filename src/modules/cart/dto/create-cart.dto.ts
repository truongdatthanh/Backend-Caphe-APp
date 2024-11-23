import { IsNotEmpty, Min } from "class-validator";
import { Types } from "mongoose";

export class CreateCartDto
{
    @IsNotEmpty()
    userId: Types.ObjectId;

    @IsNotEmpty()
    productId: Types.ObjectId[];

    @Min(1)
    quantity: number;
}
