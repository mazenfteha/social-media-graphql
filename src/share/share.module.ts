import { Module } from '@nestjs/common';
import { ShareService } from './share.service';
import { ShareResolver } from './share.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ShareDocument, ShareSchema } from './share.schema';
import { PostDocument, PostSchema } from 'src/post/post.schema';

@Module({
  imports : [
    MongooseModule.forFeature([
      {name: ShareDocument.name, schema: ShareSchema},
      {name: PostDocument.name, schema: PostSchema}
    ]),
  ],
  providers: [ShareResolver, ShareService],
})
export class ShareModule {}
