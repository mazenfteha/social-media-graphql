import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CommentModule } from './comment.module';
import { PostService } from 'src/post/post.service';
import { UserService } from 'src/user/user.service';
import { CommentDocument } from './comment.schema';
import { PostDocument } from 'src/post/post.schema';
import { Post } from 'src/post/entities/post.entity';
import { Comment } from './entities/comment.entity';


@Injectable()
export class CommentService {
  constructor(
    @InjectModel(CommentDocument.name) private readonly commentModel: Model<CommentModule>,
    @InjectModel(PostDocument.name) private readonly postModel: Model<Post>,
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}
  async create(createCommentInput: CreateCommentInput) : Promise<Comment> {
    const { userId, postId, content } = createCommentInput
    
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new NotFoundException(`Post with ID "${postId}" not found`);
    }
    const newComment = new this.commentModel({
      postId,
      userId,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    const savedComment = await newComment.save();

    // Increment the comment count on the post
    post.commentCount += 1;
    await post.save();

    return savedComment as unknown as Comment ;
  }

  findAll() {
    return this.commentModel.find().exec;
  }

  async findOne(id: Types.ObjectId) : Promise < Comment | null> {
    const comment = await this.commentModel.findById(id)
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment as unknown as Comment;
  }

  async update(updateCommentInput: UpdateCommentInput) : Promise<Comment> {
    const { id, content } = updateCommentInput;
    const comment = await this.commentModel.findById(id)

    if (!comment) {
      throw new NotFoundException(`Comment with ID "${id}" not found`);
    }

    //comment.content = content;

    return (await comment.save()).toObject();
  }

  async remove(id: Types.ObjectId) : Promise<string> {
    const comment = await this.commentModel.findById(id);

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    const post = await this.postModel.findById(comment); // comment.postId
    if (post) {
      post.commentCount -= 1;
      await post.save();
    }

    await this.commentModel.findByIdAndDelete(id);

    return `This action removes a ${id} Comment`;
  }
}
