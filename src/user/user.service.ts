import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(@InjectModel(UserDocument.name) private userModel: Model<UserDocument>){}

    async findAll() : Promise<User[]> {
        return this.userModel.find().exec();
    }
}
