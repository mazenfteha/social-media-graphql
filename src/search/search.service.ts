import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/post/entities/post.entity';
import { PostDocument } from 'src/post/post.schema';
import { Share } from 'src/share/entities/share.entity';
import { ShareDocument } from 'src/share/share.schema';
import { User } from 'src/user/user.entity';
import { UserDocument } from 'src/user/user.schema';


@Injectable()
export class SearchService {
  constructor(
    @InjectModel(UserDocument.name) private userModel: Model<UserDocument>,
    @InjectModel(PostDocument.name) private postModel: Model<PostDocument>,
    @InjectModel(ShareDocument.name) private shareModel: Model<ShareDocument>,
  ) {}
  async searchUsers(keyword: string) : Promise<User[]> {
    return this.userModel
      .find({ name: { $regex: keyword, $options: 'i' } })
      .exec();
  }
  async searchPosts(keyword: string) : Promise<Post[]> {
    return this.postModel
    .find({ content: { $regex: keyword, $options: 'i' } })
    .exec();
  }

  async searchCaptions(keyword: string) : Promise<Share[]> {
    return this.shareModel
    .find({ content: { $regex: keyword, $options: 'i' } })
    .exec() as unknown as Share[] 
  }
  
}
