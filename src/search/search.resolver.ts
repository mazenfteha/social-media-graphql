import { Resolver, Query, Args, Int} from '@nestjs/graphql';
import { SearchService } from './search.service';
import { Search, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PaginatedUsers, PaginatedPosts, PaginatedShares } from './dto/paginated-results.dto';


@UseGuards(JwtAuthGuard)
@Resolver(() => Search)
export class SearchResolver {
  constructor(private readonly searchService: SearchService) {}

  @Query(() => PaginatedUsers)
  async searchUsers(
    @Args('keyword') keyword: string,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number
  ): Promise<PaginatedUsers> {
    return this.searchService.searchUsers(keyword, page, limit);
  }

  @Query(() => PaginatedPosts)
  async searchPosts(
    @Args('keyword') keyword: string,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number
  ): Promise<PaginatedPosts> {
    return this.searchService.searchPosts(keyword, page, limit);
  }

  @Query(() => PaginatedShares)
  async searchCaptions(
    @Args('keyword') keyword: string,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number
  ): Promise<PaginatedShares> {
    return this.searchService.searchCaptions(keyword, page, limit);
  }
}
