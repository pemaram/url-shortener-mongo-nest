import { Module } from '@nestjs/common';
import { GenerateShortUrlService } from './generate-short-url.service';
import { GenerateShortUrlController } from './generate-short-url.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GeneratedURL, GeneratedURLSchema } from './entities/generate-short-url.entity';

@Module({
  imports : [MongooseModule.forFeature([{ name: GeneratedURL.name, schema: GeneratedURLSchema }])],
  controllers: [GenerateShortUrlController],
  providers: [GenerateShortUrlService],
})
export class GenerateShortUrlModule {}