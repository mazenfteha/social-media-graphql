import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/user.entity";

@ObjectType()
export class RegisterResponse {

    @Field(() => User)
    user: User;

}