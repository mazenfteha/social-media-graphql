import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NotificationDocument } from './notification.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(NotificationDocument.name) private notificationModel: Model<NotificationDocument>,
  ){}
  
  async createNotification(recipient: Types.ObjectId, sender: Types.ObjectId, type: string, message: string) {
    const notification = new this.notificationModel({
      recipient,
      sender,
      type,
      message,
      isRead: false,
    });
    return notification.save();
  }

  async markAsRead(notificationId: Types.ObjectId) {
    return this.notificationModel.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });
  }

  async getNotificationsForUser(userId: Types.ObjectId) {
    return this.notificationModel.find({ recipient: userId }).sort({ createdAt: -1 }).exec();
  }
}
