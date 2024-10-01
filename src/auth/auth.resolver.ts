import { AuthService } from './auth.service';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';
import { RegisterUserInput } from './dto/register-user.input';
import { RegisterResponse } from './dto/register-response';

@Resolver()
export class AuthResolver {
    constructor(private authService : AuthService) {}
    
    @Mutation(() => LoginResponse)
    @UseGuards(GqlAuthGuard)
    
    async login(@Args('loginUserInput') loginUserInput: LoginUserInput, @Context() context ) {
        return this.authService.login(context.user);
    }

    //@Mutation(() => User)
    @Mutation(() => RegisterResponse)
    async register(@Args('registerUserInput') registerUserInput: RegisterUserInput) : Promise<RegisterResponse>{
        return this.authService.register(registerUserInput);
    }
}
