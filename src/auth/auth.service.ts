import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDocument } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { LoginUserInput } from './dto/login-user.input';

@Injectable()
export class AuthService {
    constructor(private userService : UserService) {}

    async validateUser(email: string, password: string): Promise<UserDocument | null> {
        const user = await this.userService.findByEmail(email);
        console.log(`Email from validate user${email}`);

    
        if (user && user.password === password) {
            delete user.password;
            return user;
        }
    
        throw new UnauthorizedException('Invalid credentials');
    }

    async login(loginUserInput: LoginUserInput) {
        const email = loginUserInput.email
        console.log(email);
        const user = await this.userService.findByEmail(email);
        delete user.password;

        return {
            access_token: 'jwt' , // TODO: implement JWT
            user
        }
    }
}
