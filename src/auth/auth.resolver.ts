import { AuthService } from './auth.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';

@Resolver()
export class AuthResolver {
    constructor(private authService : AuthService) {}
    
    @Mutation(() => LoginResponse)
    @UseGuards(GqlAuthGuard)
    
    async login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
        console.log(loginUserInput);
        return this.authService.login(loginUserInput);
    }
}
