import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationResolver } from './notification.resolver';
import { NotificationDocument, NotificationSchema } from './notification.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NotificationDocument.name, schema: NotificationSchema },
    ]),
  ],
  providers: [NotificationResolver, NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
