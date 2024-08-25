import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';

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
