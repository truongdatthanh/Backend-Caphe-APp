import { IsNotEmpty, IsOptional } from "class-validator";
import { Types } from "mongoose";

export class CreateProductDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    description: string;

    @IsNotEmpty()
    price: number;

    @IsOptional()
    image: string;

    @IsNotEmpty()
    categoryId: Types.ObjectId;
}
