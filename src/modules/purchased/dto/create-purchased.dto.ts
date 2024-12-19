import { IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class CreatePurchasedDto
{
    @IsNotEmpty()
    cartId: Types.ObjectId;

    @IsNotEmpty()
    userId: Types.ObjectId;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    total: number;

    @IsNotEmpty()
    paymentOption: string;
}
