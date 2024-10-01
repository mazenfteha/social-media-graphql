import { Module } from '@nestjs/common';
import { ShareService } from './share.service';
import { ShareResolver } from './share.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ShareDocument, ShareSchema } from './share.schema';
import { PostDocument, PostSchema } from 'src/post/post.schema';
import { UserDocument, UserSchema } from 'src/user/user.schema';

@Module({
  imports : [
    MongooseModule.forFeature([
      {name: ShareDocument.name, schema: ShareSchema},
      {name: PostDocument.name, schema: PostSchema},
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  providers: [ShareResolver, ShareService],
  exports:[ShareService]
})
export class ShareModule {}
