import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { Roles } from '../auth/decorators/role.decorator';
import { Role } from 'enum/role.enum';
import { Types } from 'mongoose';


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get("/")
  findAll() {
    return this.productService.findAll();
  }


  @Post("/create-product")
  @Roles(Role.Admin)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }


  @Patch('/update-product/:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }


  @Delete('/delete-product/:id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }

  @Get('/get-product-by-category/:id')
  getProductByCategory(@Param('id') categoryId: string) {
    return this.productService.getProductByCategory(categoryId);
  }

}
