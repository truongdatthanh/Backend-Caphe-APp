import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart } from './entities/cart.entity';
import { isEmpty } from 'class-validator';


@Injectable()
export class CartService {
 
  constructor(
    @InjectModel( 'Cart' ) private cartModel: Model<Cart>,
  ) {}
  
  async findAll() {
    return this.cartModel.find();
  }

  async addToCart ( createCartDto: CreateCartDto )
  {
    let cart = await this.cartModel.findOne( { productId: createCartDto.productId } );
    if ( isEmpty(cart) )
    {
      cart = await this.cartModel.create( createCartDto );
    }
    else
    {
      cart.quantity += createCartDto.quantity;
      cart = await this.cartModel.findByIdAndUpdate( cart._id, cart, { new: true } );
    }
  }

  async removeFromCart ( id: string )
  {
    return this.cartModel.findOneAndDelete( { _id: new Types.ObjectId(id) } );
  }

  async clearCart ()
  {
    return this.cartModel.deleteMany();
  }
}
