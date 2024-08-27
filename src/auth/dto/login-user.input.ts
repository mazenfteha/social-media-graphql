import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';


@InputType()
export class LoginUserInput {
    @Field()
    @IsNotEmpty()
    @IsEmail({}, { message: 'Email must be valid' })
    email: string;

    
    @Field()
    @IsNotEmpty()
    @IsString()
    @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
    password: string;
}