import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart } from './entities/cart.entity';
import { isEmpty } from 'class-validator';


@Injectable()
export class CartService
{
  constructor ( @InjectModel( 'Cart' ) private cartModel: Model<Cart> ) { }

  async getCart ( userId: string )
  {
    const listCart = await this.cartModel.findOne( { userId, status: true } );
    // const listCartActive = await listCart.filter((cart) => cart.status === true);
    console.log( ">>>.listCart: " + listCart );
    // if (!listCart || isEmpty(listCart)) {
    //   throw new BadRequestException('Cart not found');
    // }
    return listCart;
  }

  async addToCart ( userId: string, productId: string, quantity: number )
  {
    const cart = await this.cartModel.findOne( { userId, status: true} );
    // const cartActive = await this.cartModel.find( { userId, status: true } );
    console.log( ">>>.cart: " + cart );
    if ( !cart  || isEmpty(cart) )
    {
      const newCart = new this.cartModel( {
        userId,
        items: [ { productId, quantity } ],
      } );
      return newCart.save();
    }

    const itemIndex = cart.items.findIndex(
      ( item ) => item.productId === productId,
    );

    if ( itemIndex > -1 )
    {
      cart.items[ itemIndex ].quantity += quantity;
    } else
    {
      cart.items.push( { productId, quantity } );
    }

    return cart.save();
  }

  async removeFromCart ( userId: string, productId: string )
  {
    const cart = await this.cartModel.findOne( { userId, status: true } );

    if ( cart )
    {
      cart.items = cart.items.filter( ( item ) => item.productId !== productId );
      return cart.save();
    }

    return null;
  }

  async clearCart ( userId: string )
  {
    const cart = await this.cartModel.findOne( { userId } );
    if ( cart )
    {
      cart.items = [];
      return cart.save();
    }
    return null;
  }

  async updateStatusCart ( userId: string, status: boolean )
  {
    const cart = await this.cartModel.findOne( { userId, status: true } );
    if ( cart )
    {
      cart.status = status;
      return cart.save();
    }
    return null;
  }

  async findCartByUserId ( userId: string )
  {
    const cart = await this.cartModel.findOne( { userId, status: true } );
    return cart;
  }
}
