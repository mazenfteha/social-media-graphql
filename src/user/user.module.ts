import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDocument, UserSchema } from './user.schema';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: UserDocument.name, schema: UserSchema }]),
        NotificationModule
    ],
    providers: [UserResolver,UserService],
    exports: [UserService],
})
export class UserModule {}
