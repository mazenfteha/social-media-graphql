import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShareInput } from './dto/create-share.input';
import { UpdateShareInput } from './dto/update-share.input';
import { Share } from './entities/share.entity';
import { ShareDocument } from './share.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PostDocument } from 'src/post/post.schema';

@Injectable()
export class ShareService {
  constructor(
    @InjectModel(ShareDocument.name) private readonly shareModel: Model<ShareDocument>,
    @InjectModel(PostDocument.name) private postModel: Model<PostDocument>
  ){}
  async create(createShareInput: CreateShareInput) : Promise<Share> {
    const { userId, postId, caption } = createShareInput;
    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new NotFoundException(`Post with ID "${postId}" not found`);
    }

    const newShare = new this.shareModel({ userId, postId, caption, createdAt: new Date() });
    return newShare.save() as unknown as Share ;
  }

  findAll(userId: Types.ObjectId) {
    return this.shareModel.find({userId: userId}).populate('post').populate('user').exec()
  }


  async update(updateShareInput: UpdateShareInput) : Promise<Share> {
    const {shareId, userId, caption} = updateShareInput;
    const share = await this.shareModel.findOne({ _id: shareId, user: userId })
    if (!share) {
      throw new NotFoundException(`Share with ID "${shareId}" not found`);
    }
    share.caption = caption
    return share.save() as unknown as Share ;
  }

  async remove(id: Types.ObjectId) {
    await this.shareModel.findByIdAndDelete(id);
    return `This action removes a #${id} share`;
  }
}
