import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GraphQLUpload, FileUpload } from 'graphql-upload';



@Resolver(() => User)
export class UserResolver {
    constructor(private userService: UserService) {}

    @Query(() => String)
    sayHello(): string {
        return 'Hello, World!';
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => [User])
    async getUsers(): Promise<User[]> {
        return this.userService.findAll();
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
}
