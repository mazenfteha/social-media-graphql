import { InputType, Field, ID } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsString} from 'class-validator';
import { Types } from 'mongoose';

@InputType()
export class CreateCommentInput {

  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  postId: Types.ObjectId;

  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  userId: Types.ObjectId;

  @Field()
  @IsString()
  @IsNotEmpty()
  content: string;
  
}
