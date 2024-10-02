import { Post } from './entities/post.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { InjectModel } from '@nestjs/mongoose';
import { PostDocument } from './post.schema';
import { Model, Types } from 'mongoose';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(PostDocument.name) private postModel: Model<PostDocument>, 
    private readonly userService: UserService
){}
  async create(createPostInput: CreatePostInput) : Promise<Post> {
    const { userId, content, media } = createPostInput;
    
    // Verify user exists
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const post = new this.postModel({
      userId,
      content,
      media,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return post.save();
  }

  async getFeed(limit: number = 10, offset: number = 0) : Promise<Post[]> { 
    return this.postModel.find()
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit)
    .exec();
  }

  async findOne(id: Types.ObjectId) : Promise < Post | null> {
    const post = await this.postModel.findById(id)
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async update(updatePostInput: UpdatePostInput): Promise<Post> {
    const { postId, content, media } = updatePostInput;

    const post = await this.postModel.findById(postId);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    // Update the fields if they are provided
    if (content !== undefined) {
      post.content = content;
    }
    if (media !== undefined) {
      post.media = media;
    }

    post.updatedAt = new Date();

    return post.save();
  }

  async remove(id: Types.ObjectId) : Promise<string> {
    const post = await this.postModel.findById(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    await this.postModel.findByIdAndDelete(id);
    return `This action removes a ${id} post`;
  }
}
