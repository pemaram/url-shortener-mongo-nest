import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { GenerateShortUrlModule } from './generate-short-url/generate-short-url.module';
import { ConsumerModule } from './consumer/consumer.module';
import { PanelUsersModule } from './panel-users/panel-users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true
    }),
    MongooseModule.forRoot(`${process.env.MONGODB_URL}`),
    GenerateShortUrlModule,
    ConsumerModule,
    PanelUsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
