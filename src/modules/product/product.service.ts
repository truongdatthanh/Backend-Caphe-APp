import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from './entities/product.entity';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel('Product') private productModel: Model<Product>,
    private readonly categoryService: CategoryService
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { ...payload } = createProductDto;
    const product = await this.productModel.create({
      ...payload,
      categoryId: new Types.ObjectId(payload.categoryId), 
    });
    return product.save();
  }

  async findAll() {
    const products = await this.productModel.find();
    return products;
  }

 async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true });
    return product;
  }

  async remove(id: string) {
    const product = await this.productModel.findByIdAndDelete(id);
    return product;
  }

  async getProductByCategory ( categoryId: string )
  {
    const products = await this.productModel.find({ categoryId: new Types.ObjectId(categoryId) }).populate('categoryId');
    return products;
  }
  
  async findOne( id: Types.ObjectId )
  {
    const product = await this.productModel.findById(id);
    return product;
  }

  async getProductByNames ( names: string )
  {
    const products = await this.productModel.find( { name: names });
    console.log( products );
    return products;
  }
}
