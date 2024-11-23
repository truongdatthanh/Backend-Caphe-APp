import { Controller, Get, Post, Body, Patch, Param, Delete, Type } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Types } from 'mongoose';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get("")
  showCart() {
    return this.cartService.findAll();
  }
     
  @Post( "/add-to-cart" )
  addToCart( @Body() createCartDto: CreateCartDto )
  {
    return this.cartService.addToCart( createCartDto );
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }
  
  @Delete( "/remove/:id" )
  removeFromCart( @Param( 'id' ) id: string )
  {
    return this.cartService.removeFromCart( id );
  }
  
  @Delete( "/clear" )
  clearCart()
  {
    return this.cartService.clearCart();
  }
}
