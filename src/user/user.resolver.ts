import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


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
}
