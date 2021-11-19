import { Model } from 'mongoose';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel
      .findOne({
        email: createUserDto.email,
      })
      .exec();

    if (!user) {
      const newUser = new this.userModel(createUserDto);
      return newUser.save();
    }

    throw new ForbiddenException('This e-mail already exists');
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async getByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateUserDto,
      },
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.userModel.deleteOne({ _id: id }).exec();
  }
}
