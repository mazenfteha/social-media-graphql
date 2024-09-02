import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentDocument, CommentSchema } from './comment.schema';
import { UserModule } from 'src/user/user.module';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CommentDocument.name, schema: CommentSchema }]),
    UserModule,
    PostModule
  ],
  providers: [CommentResolver, CommentService],
})
export class CommentModule {}
