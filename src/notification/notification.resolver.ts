import { Resolver, Query, Mutation, Args, ID, Subscription } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { Notification } from './entities/notification.entity';
import { Types } from 'mongoose';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
const pubSub = new PubSub();

@UseGuards(JwtAuthGuard)
@Resolver(() => Notification)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Subscription(() => Notification, {
    filter: (payload, variables) => payload.recipient === variables.userId,
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  notificationAdded(@Args('userId', { type: () => ID }) userId: Types.ObjectId) {
    return pubSub.asyncIterator('notificationAdded');
  }

  // After creating a notification, publish the event:
  async createNotification(recipient: Types.ObjectId, sender: Types.ObjectId, type: string, message: string) {
    const notification = await this.notificationService.createNotification(recipient, sender, type, message);
    pubSub.publish('notificationAdded', { notificationAdded: notification });
    return notification;
  }

 
  // Get notifications for a user
  @Query(() => [Notification])
  async getNotifications(@Args('userId', { type: () => ID }) userId: Types.ObjectId) {
    return this.notificationService.getNotificationsForUser(userId);
  }

  // Mark a notification as read
  @Mutation(() => Notification)
  async markNotificationAsRead(@Args('notificationId', { type: () => ID }) notificationId: Types.ObjectId) {
    return this.notificationService.markAsRead(notificationId);
  }
}
