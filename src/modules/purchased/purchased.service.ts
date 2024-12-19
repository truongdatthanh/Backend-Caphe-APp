import { Injectable } from '@nestjs/common';
import { CreatePurchasedDto } from './dto/create-purchased.dto';
import { UpdatePurchasedDto } from './dto/update-purchased.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Purchased } from './entities/purchased.entity';

@Injectable()
export class PurchasedService
{
  constructor (
    @InjectModel( 'Purchased' ) private purchasedModel: Model<Purchased>,
  ) { }

  async create ( createPurchasedDto: CreatePurchasedDto )
  {
    const { ...payload } = createPurchasedDto;
    const purchased = await this.purchasedModel.create(
      {
        ...payload,
        cartId: new Types.ObjectId( payload.cartId ),
        userId: new Types.ObjectId( payload.userId ),
      }
    );
    return purchased.save();
  }

  findAll ()
  {
    return `This action returns all purchased`;
  }

  async findOne ( id: string )
  {
    const purchased = await this.purchasedModel.findById( id ).populate( 'cartId' );
    return purchased;
  }

  update ( id: number, updatePurchasedDto: UpdatePurchasedDto )
  {
    return `This action updates a #${ id } purchased`;
  }

  remove ( id: number )
  {
    return `This action removes a #${ id } purchased`;
  }
}
