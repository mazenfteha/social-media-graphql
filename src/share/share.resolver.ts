import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ShareService } from './share.service';
import { Share } from './entities/share.entity';
import { CreateShareInput } from './dto/create-share.input';
import { UpdateShareInput } from './dto/update-share.input';
import { Types } from 'mongoose';

@Resolver(() => Share)
export class ShareResolver {
  constructor(private readonly shareService: ShareService) {}

  @Mutation(() => Share)
  createShare(@Args('createShareInput') createShareInput: CreateShareInput) {
    return this.shareService.create(createShareInput);
  }

  @Query(() => [Share], { name: 'share' })
  findAll(@Args('userId', { type: () => ID }) userId: Types.ObjectId) {
    return this.shareService.findAll(userId);
  }

  @Mutation(() => Share)
  updateShare(@Args('updateShareInput') updateShareInput: UpdateShareInput) {
    return this.shareService.update(updateShareInput);
  }

  @Mutation(() => Share)
  removeShare(@Args('id', { type: () => Int }) id: Types.ObjectId) {
    return this.shareService.remove(id);
  }
}
