import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDocument, UserSchema } from './user.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: UserDocument.name, schema: UserSchema }])],
    providers: [UserResolver,UserService]
})
export class UserModule {}
