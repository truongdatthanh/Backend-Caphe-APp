import { Controller, Get, Post, Body, Patch, Param, Delete, Type } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Types } from 'mongoose';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/:userId')
  async getCart(@Param('userId') userId: string) {
    return this.cartService.getCart(userId);
  }

  @Post('add')
  async addToCart(
    @Body('userId') userId: string,
    @Body('productId') productId: string,
    @Body('quantity') quantity: number,
  ) {
    return this.cartService.addToCart(userId, productId, quantity);
  }

  @Delete('remove')
  async removeFromCart(@Body('userId') userId: string, @Body('productId') productId: string) {
    return this.cartService.removeFromCart(userId, productId);
  }
}
