import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { UpdateBioInput } from './dto/update-bio.input';
import { SendFriendRequestInput } from './dto/send-friend-request.input';
import { AcceptFriendRequestInput } from './dto/accept-friend-request.input';
import { CancelFriendRequestInput } from './dto/cancel-friend-request.inptu';



@UseGuards(JwtAuthGuard)
@Resolver(() => User)
export class UserResolver {
    constructor(private userService: UserService) {}

    @Query(() => User)
    async getUserprofile(@Args('userId') userId: string): Promise<User> {
        return this.userService.getUserProfile(userId);
    }

    @Mutation(() => User)
    async addOrUpdateBio(@Args('updateBioInput') updateBioInput: UpdateBioInput): Promise<User> {
        const { userId, bio } = updateBioInput;
        return this.userService.updateBio(userId, bio);
    }

    @Mutation(() => String)
    async uploadProfileImage(
        @Args('userId') userId: string,
        @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
    ): Promise<string> {
        return this.userService.uploadProfileImage(userId, file);
    }

    @Mutation(() => String)
    async deleteProfileImage(@Args('userId') userId: string): Promise<string> {
        return this.userService.deleteProfileImage(userId);
    }

    // Friendships Resolvers
    @Mutation(() => String)
    async sendFriendRequest(@Args('sendFriendRequestInput') sendFriendRequestInput: SendFriendRequestInput): Promise<string> {
        return this.userService.sendFriendRequest(sendFriendRequestInput);
    }

    //accept friend request
    @Mutation(() => String)
    async acceptFriendRequest(@Args('acceptFriendRequestInput') acceptFriendRequestInput: AcceptFriendRequestInput): Promise<string> {
        return this.userService.acceptFriendRequest(acceptFriendRequestInput);
    }

    // cancel friend request
    @Mutation(() => String)
    async cancelFriendRequest(@Args('cancelFriendRequestInput') cancelFriendRequestInput: CancelFriendRequestInput): Promise<string> {
        return this.userService.cancelFriendRequest(cancelFriendRequestInput);
    }

    // get friends
    @Query(() => [User])
    async getFriends(@Args('userId') userId: string): Promise<User[]> {
        return this.userService.getFriends(userId);
    }
}
