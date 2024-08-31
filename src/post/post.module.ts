import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { PostDocument, PostSchema } from './post.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports : [MongooseModule.forFeature([{ name: PostDocument.name, schema: PostSchema }])],
  providers: [PostResolver, PostService],
})
export class PostModule {}
