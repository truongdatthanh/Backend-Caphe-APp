import { Controller, Get, Post, Body, Patch, Param, Delete, Type } from '@nestjs/common';
import { CartService } from './cart.service';
import { Types } from 'mongoose';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/:id')
  async getCart ( @Param( 'id' ) id: string )
  {
    console.log(id);
    return this.cartService.getCart(id);
  }

  @Post('add')
  async addToCart(
    @Body('userId') userId: string,
    @Body('productId') productId: string,
    @Body('quantity') quantity: number,
  ) {
    return this.cartService.addToCart(userId, productId, quantity);
  }

  @Delete('remove/:userId/:productId')
  async removeFromCart(@Param('userId') userId: string, @Param('productId') productId: string) {
    return this.cartService.removeFromCart(userId, productId);
  }

  @Delete( 'clear/:userId' )
  async clearCart ( @Param( 'userId' ) userId: string )
  {
    return this.cartService.clearCart( userId );
  }

  @Patch( 'update-status/:userId' )
  async updateStatus ( @Param( 'userId' ) userId: string, @Body('status') status: boolean )
  {
    return this.cartService.updateStatusCart(userId, status );
  }

  @Get( '/get-cart/:userId' )
  async getCartByUserId ( @Param( 'userId' ) userId: string )
  {
    return this.cartService.findCartByUserId( userId );
  }
}
