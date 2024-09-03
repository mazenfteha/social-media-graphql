import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchResolver } from './search.resolver';
import { ShareDocument, ShareSchema } from 'src/share/share.schema';
import { PostDocument, PostSchema } from 'src/post/post.schema';
import { UserDocument, UserSchema } from 'src/user/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports : [
    MongooseModule.forFeature([
      {name: ShareDocument.name, schema: ShareSchema},
      {name: PostDocument.name, schema: PostSchema},
      {name: UserDocument.name, schema: UserSchema}
    ]),
  ],
  providers: [SearchResolver, SearchService],
})
export class SearchModule {}
