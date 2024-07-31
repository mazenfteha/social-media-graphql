import { Query, Resolver } from '@nestjs/graphql';
import { User } from './user.schema';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
    constructor(private userService: UserService) {}

    @Query(() => String)
    sayHello(): string {
        return 'Hello, World!';
    }

    @Query(() => [User])
    async getUsers(): Promise<User[]> {
        return this.userService.findAll();
    }
}
