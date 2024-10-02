import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Post } from "src/post/entities/post.entity";
import { Share } from "src/share/entities/share.entity";
import { User } from "src/user/user.entity";

@ObjectType()
class PaginationMeta {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  totalPages: number;
}

@ObjectType()
export class PaginatedUsers {
  @Field(() => [User])
  data: User[];

  @Field(() => PaginationMeta)
  meta: PaginationMeta;
}

@ObjectType()
export class PaginatedPosts {
  @Field(() => [Post])
  data: Post[];

  @Field(() => PaginationMeta)
  meta: PaginationMeta;
}

@ObjectType()
export class PaginatedShares {
  @Field(() => [Share])
  data: Share[];

  @Field(() => PaginationMeta)
  meta: PaginationMeta;
}