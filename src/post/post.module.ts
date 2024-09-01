import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { PostDocument, PostSchema } from './post.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';

@Module({
  imports : [
    MongooseModule.forFeature([{ name: PostDocument.name, schema: PostSchema }]),
    UserModule
  ],
  providers: [PostResolver, PostService]
})
export class PostModule {}
