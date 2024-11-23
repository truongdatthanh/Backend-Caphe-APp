import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {

  constructor(
    @InjectModel('Category') private categoryModel: Model<Category>
  ) {}

  async findAll() {
    const categories = await this.categoryModel.find();
    return categories;
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryModel.create(createCategoryDto);
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true });
    return category;
  }

  async remove(id: string) {
    const category = await this.categoryModel.findByIdAndDelete(id);
    return category;
  }
 
  async getCategoryById(id: string) {
    const category = await this.categoryModel.findById({ _id: new Types.ObjectId(id) });
    return category;
  }

  
}
