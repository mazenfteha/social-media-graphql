import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';


@InputType()
export class RegisterUserInput {
    @Field()
    @IsString()
    name: string;
    
    @Field()
    @IsEmail({}, { message: 'Email must be valid' })
    @IsNotEmpty()
    email: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
    password: string;
}