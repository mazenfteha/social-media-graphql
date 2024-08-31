import { UserDocument } from './../user/user.schema';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserInput } from './dto/register-user.input';
import * as bcrypt from 'bcrypt';
import { RegisterResponse } from './dto/register-response';

@Injectable()
export class AuthService {
    constructor(
        private userService : UserService ,
        private jwtService : JwtService,
    ) {}

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

        return {
            access_token: this.jwtService.sign({ name : user.name, sub: user._id }),
            user
        }
    }

    
    async register(registerUserInput: RegisterUserInput) : Promise<RegisterResponse>{
            const { name, email, password } = registerUserInput;

            const existingUser = await this.userService.findByEmail(email);
            if (existingUser) {
                throw new ConflictException('Email already exists');
            }
        
            const hashedPassword = await bcrypt.hash(password, 10);
    
            const newUser = await this.userService.create({
                name,
                email,
                password: hashedPassword,
            });
    
            return { user: newUser };
    }
}
