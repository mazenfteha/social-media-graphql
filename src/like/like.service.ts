import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLikeInput } from './dto/create-like.input';
import { LikeDocument } from './like.schema';
import { Model, Types } from 'mongoose';
import { PostDocument } from 'src/post/post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Like } from './entities/like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectModel(LikeDocument.name) private readonly likeModel: Model<LikeDocument>,
    @InjectModel(PostDocument.name) private readonly postModel: Model<PostDocument>,
  ) { }
  async create(createLikeInput: CreateLikeInput): Promise<Like> {
    const { postId, userId } = createLikeInput;

    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new NotFoundException(`Post with ID "${postId}" not found`);
    }

    const existingLike = await this.likeModel.findOne({ postId, userId });
    if (existingLike) {
      throw new Error(`User with ID "${userId}" has already liked this post`);
    }

    const newLike = new this.likeModel({
      postId,
      userId,
    });
    const savedLike = await newLike.save();

    // Increment the like count on the post
    post.likeCount += 1;
    await post.save();

    return savedLike;
  }


  async remove(postId: Types.ObjectId, userId: Types.ObjectId): Promise<Like> {
    // Find the like by postId and userId
    const like = await this.likeModel.findOne({ postId, userId });

    if (!like) {
      throw new NotFoundException(`Like by user with ID "${userId}" on post with ID "${postId}" not found`);
    }

    // Find the post to update the like count
    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new NotFoundException(`Post with ID "${postId}" not found`);
    }

    // Remove the like
    await like.deleteOne();

    // Decrement the like count on the post
    post.likeCount = Math.max(post.likeCount - 1, 0);
    await post.save();

    return like;
  }
}
