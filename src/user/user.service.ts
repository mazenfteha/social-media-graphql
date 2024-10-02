import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './user.schema';
import { Model, Types } from 'mongoose';
import { User } from './user.entity';
import { RegisterUserInput } from 'src/auth/dto/register-user.input';
import { FileUpload } from 'graphql-upload';
import { join } from 'path';
import * as fs from 'fs'; 
import { SendFriendRequestInput } from './dto/send-friend-request.input';
import { AcceptFriendRequestInput } from './dto/accept-friend-request.input';
import { CancelFriendRequestInput } from './dto/cancel-friend-request.inptu';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(UserDocument.name) private userModel: Model<UserDocument>,
        private notificationService: NotificationService
    ){}


    async findById(userId: Types.ObjectId) {
        const user = await this.userModel.findById(userId)
        return user
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
    
        const imageUrl = `uploads/${filename}`;
    
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

    async deleteProfileImage(userId: string): Promise<string> {
    const user = await this.userModel.findById(userId);

    if (!user || !user.profile.image) {
        throw new Error('User or profile image not found');
    }

    const imagePath = join(__dirname, '..', '..', user.profile.image);

    try {
        fs.unlinkSync(imagePath);
    } catch (error) {
        console.error('Error deleting file:', error);
        throw new Error('Could not delete image file');
    }

    user.profile.image = '';
    await user.save();

    return 'Profile image deleted successfully';

    }

    getUserProfile(userId: string): User | PromiseLike<User> {
        if (!userId) {
            throw new BadRequestException('User ID is required');
        }
        const user = this.userModel.findById(userId).exec();
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async updateBio(userId: string, bio: string): Promise <User> {
        if (!userId) {
            throw new BadRequestException('User ID is required');
        }
        const user = await this.userModel.findById(userId)
        if (!user) {
            throw new NotFoundException('User not found');
        }
        if (!user.profile) {
            user.profile = {
                image: '',
                bio: '',
            };
        }
        user.profile.bio = bio;
        return user.save();
    }

    
    async sendFriendRequest(sendFriendRequestInput: SendFriendRequestInput): Promise<string> {
        try {
        const { senderId, receiverId } = sendFriendRequestInput;
        const sender = await this.userModel.findById(senderId)
        const receiver = await this.userModel.findById(receiverId)

        if (!sender ||!receiver) {
            throw new NotFoundException('User not found');
        }

        if(sender.id === receiver.id) {
            throw new BadRequestException('Cannot send friend request to yourself');
        }

        if (receiver.friendRequests.includes(sender._id)) {
            throw new BadRequestException('Friend request already sent');
        }

        if (receiver.friends.includes(sender._id)) {
            throw new BadRequestException('Users are already friends');
        }

        receiver.friendRequests.push(sender._id);
        await receiver.save();

        // Trigger Notification
        await this.notificationService.createNotification(
            receiverId,
            senderId,
            'friend_request',
            `You have a new friend request from user ${senderId}`
        )

        return 'Friend request sent successfully';
        } catch (error) {
            throw error
        }
    }

    async acceptFriendRequest(acceptFriendRequestInput: AcceptFriendRequestInput): Promise<string> {
        try {
            const { senderId, receiverId } = acceptFriendRequestInput;
            const sender = await this.userModel.findById(senderId)
            const receiver = await this.userModel.findById(receiverId)

            if (!sender ||!receiver) {
                throw new NotFoundException('User not found');
            }

            const requestIndex = receiver.friendRequests.indexOf(sender.id)

            if (requestIndex === -1) {
                throw new BadRequestException('No friend request found');
            }
            // Remove the request from the list of friend requests
            receiver.friendRequests.splice(requestIndex, 1);

            // Add the sender and receiver to the list of friends for each others
            receiver.friends.push(sender.id);
            sender.friends.push(receiver.id);
            await receiver.save();
            await sender.save();

            return 'Friend request accepted successfully';

        } catch (error) {
            throw error
        }
    }

    async cancelFriendRequest(cancelFriendRequestInput: CancelFriendRequestInput): Promise<string> {
        try {
            const { senderId, receiverId } = cancelFriendRequestInput;
            const sender = await this.userModel.findById(senderId)
            const receiver = await this.userModel.findById(receiverId)

            if (!sender ||!receiver) {
                throw new NotFoundException('User not found');
            }

            const requestIndex = receiver.friendRequests.indexOf(sender.id)

            if (requestIndex === -1) {
                throw new BadRequestException('No friend request found');
            }
            // Remove the request from the list of friend requests
            receiver.friendRequests.splice(requestIndex, 1);

            await receiver.save();

            return 'Friend request canceled successfully';
        } catch (error) {
            throw error
        }
    }

    async getFriends(userId: string): Promise<User[]> {
        try {
            const user = await this.userModel.findById(userId);
            if (!user) {
                throw new NotFoundException('User not found');
            }
            const friends = await this.userModel.find({ _id: { $in: user.friends } });
            return friends;
        } catch (error) {
            throw error
        }
    }
}
