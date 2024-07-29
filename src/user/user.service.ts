import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = new this.userModel(createUserDto);
      return createdUser.save();
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return this.userModel.find().exec();
    } catch (error) {
      throw error;
    }
  }

  async findByName(name: string): Promise<User | null> {
    try {
      return this.userModel.findOne({ name }).exec();
    } catch (error) {
      throw error;
    }
  }

  async findById(userId: string): Promise<User | null> {
    try {
      const userObjectId = new Types.ObjectId(userId);
      return this.userModel.findById(userObjectId).exec();
    } catch (error) {
      throw error;
    }
  }
}
