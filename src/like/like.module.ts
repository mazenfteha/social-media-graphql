import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeResolver } from './like.resolver';
import { LikeDocument, LikeSchema } from './like.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PostDocument, PostSchema } from 'src/post/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LikeDocument.name, schema: LikeSchema },
      {name: PostDocument.name, schema: PostSchema}
    ])
  ],
  providers: [LikeResolver, LikeService],
})
export class LikeModule {}
