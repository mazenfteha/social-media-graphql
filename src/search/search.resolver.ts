import { Resolver, Query, Args} from '@nestjs/graphql';
import { SearchService } from './search.service';
import { Search, UseGuards } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { Post } from 'src/post/entities/post.entity';
import { Share } from 'src/share/entities/share.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Resolver(() => Search)
export class SearchResolver {
  constructor(private readonly searchService: SearchService) {}

  @Query(() => [User])
  async searchUsers(@Args('keyword') keyword: string): Promise<User[]> {
    return this.searchService.searchUsers(keyword);
  }

  @Query(() => [Post])
  async searchPosts(@Args('keyword') keyword: string): Promise<Post[]> {
    return this.searchService.searchPosts(keyword);
  }

  @Query(() => [Share])
  async searchCaptions(@Args('keyword') keyword: string): Promise<Share[]> {
    return this.searchService.searchCaptions(keyword);
  }
}
