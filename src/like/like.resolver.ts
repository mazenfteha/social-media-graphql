import { Resolver, Mutation, Args, ID } from '@nestjs/graphql';
import { LikeService } from './like.service';
import { Like } from './entities/like.entity';
import { CreateLikeInput } from './dto/create-like.input';
import { Types } from 'mongoose';
@Resolver(() => Like)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @Mutation(() => Like)
  createLike(@Args('createLikeInput') createLikeInput: CreateLikeInput) {
    return this.likeService.create(createLikeInput);
  }


  @Mutation(() => Like)
  async removeLike(
    @Args('postId', { type: () => ID }) postId: Types.ObjectId,
    @Args('userId', { type: () => ID }) userId: Types.ObjectId,
  ): Promise<Like> {
    return this.likeService.remove(postId, userId);
  }
}
