// import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { User } from './entities/user.entity';

// @Injectable()
// export class UserService {

//   @InjectModel('User') private userModel: Model<User>;

//   async create(createUserDto: CreateUserDto) {
//     const user = await this.userModel.create(createUserDto);
//     return user;
//   }

//   async update(id: string, updateUserDto: UpdateUserDto) {
//     const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
//     return user;
//   }
  

// }

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  async create(username: string, password: string, phoneNumber: string, address: string, avatar: string, name: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel( {
      username,
      password: hashedPassword,
      status: true,
      phoneNumber,
      address,
      avatar,
      name,
      role: 'user'
    } );  
    return user.save();
  }

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.findOne(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }

    async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    return user;
  }
}