import { Field, ID, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class UpdateBioInput {
    @Field(() => ID)
    @IsNotEmpty()
    userId: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    bio: string;
}