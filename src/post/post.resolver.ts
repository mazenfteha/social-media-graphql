import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Types } from 'mongoose';

@UseGuards(JwtAuthGuard)
@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postService.create(createPostInput);
  }

  @Query(() => [Post], { name: 'postsFeed' })
    getPostsFeed(
      @Args('limit', { type: () => Int, nullable: true }) limit?: number,
      @Args('offset', { type: () => Int, nullable: true }) offset?: number,
  ) {
    return this.postService.getFeed(limit, offset);
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => ID }) id: Types.ObjectId) {
    return this.postService.findOne(id);
  }

  @Mutation(() => Post)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postService.update(updatePostInput);
  }

  @Mutation(() => String)
  removePost(@Args('id', { type: () => ID }) id: Types.ObjectId) {
    return this.postService.remove(id);
  }
}
