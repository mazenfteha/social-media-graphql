import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Post } from 'src/post/entities/post.entity';
import { PostDocument } from 'src/post/post.schema';
import { Share } from 'src/share/entities/share.entity';
import { ShareDocument } from 'src/share/share.schema';
import { User } from 'src/user/user.entity';
import { UserDocument } from 'src/user/user.schema';

interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}


@Injectable()
export class SearchService {
  constructor(
    @InjectModel(UserDocument.name) private userModel: Model<UserDocument>,
    @InjectModel(PostDocument.name) private postModel: Model<PostDocument>,
    @InjectModel(ShareDocument.name) private shareModel: Model<ShareDocument>,
  ) {}
  private async paginatedSearch<T>(
    model: Model<T>,
    filter: FilterQuery<T>,
    page: number,
    limit: number
  ): Promise<PaginatedResult<T>> {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      model.find(filter).skip(skip).limit(limit).exec(),
      model.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: { total, page, limit, totalPages }
    };
  }

  async searchUsers(keyword: string, page: number = 1, limit: number = 10): Promise<PaginatedResult<User>> {
    const regex = new RegExp(keyword, 'i');
    return this.paginatedSearch(this.userModel, { name: { $regex: regex } }, page, limit);
  }

  async searchPosts(keyword: string, page: number = 1, limit: number = 10): Promise<PaginatedResult<Post>> {
    const regex = new RegExp(keyword, 'i');
    return this.paginatedSearch(this.postModel, { content: { $regex: regex } }, page, limit);
  }

  async searchCaptions(keyword: string, page: number = 1, limit: number = 10): Promise<PaginatedResult<Share>> {
    const regex = new RegExp(keyword, 'i');
    return this.paginatedSearch(this.shareModel, { caption: { $regex: regex } }, page, limit);
  }
  
}
