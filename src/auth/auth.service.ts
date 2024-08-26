import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDocument } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService : UserService , private jwtService : JwtService) {}

    async validateUser(email: string, password: string): Promise<UserDocument | null> {
        const user = await this.userService.findByEmail(email);
        console.log(`Email from validate user${email}`);

    
        if (user && user.password === password) {
            delete user.password;
            return user;
        }
    
        throw new UnauthorizedException('Invalid credentials');
    }

    async login(user : User) {
        const email = user.email
        console.log(email);

        return {
            access_token: this.jwtService.sign({ name : user.name, sub: user._id }),
            user
        }
    }
}
