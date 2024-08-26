import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { User } from './user.entity';
import { RegisterUserInput } from 'src/auth/dto/register-user.input';
RegisterUserInput

@Injectable()
export class UserService {
    constructor(@InjectModel(UserDocument.name) private userModel: Model<UserDocument>){}

    async findAll() : Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async create(createUserDto: RegisterUserInput): Promise<UserDocument> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }
}
