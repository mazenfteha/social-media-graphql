import { InputType, Field, ID} from '@nestjs/graphql';
import { IsArray, IsMongoId, IsNotEmpty, IsString} from 'class-validator';
import { Types } from 'mongoose';

@InputType()
export class UpdatePostInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  postId: Types.ObjectId;

  @Field({ nullable: true })
  @IsString()
  content?: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  media?: string[];
}
