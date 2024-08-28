import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { User } from './user.entity';
import { RegisterUserInput } from 'src/auth/dto/register-user.input';
import { FileUpload } from 'graphql-upload';
import { join } from 'path';
import * as fs from 'fs'; 

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

    async uploadProfileImage(userId: string, file: FileUpload): Promise<string> {
        const { createReadStream, filename } = file;
        const uploadPath = join(__dirname, '..', '..', 'uploads', filename);
    
        const stream = createReadStream();
        const out = fs.createWriteStream(uploadPath);
        stream.pipe(out);
    
        // Assuming you store the relative path in the database
        const imageUrl = `uploads/${filename}`;
    
        // Update the user's profile with the new image URL
        await this.updateUserProfileImage(userId, imageUrl);
    
        return imageUrl;
    }

    async updateUserProfileImage(userId: string, imageUrl: string): Promise<UserDocument> {
        return this.userModel.findByIdAndUpdate(
            userId,
            { 'profile.image': imageUrl },
            { new: true },
        ).exec();
    }
}
