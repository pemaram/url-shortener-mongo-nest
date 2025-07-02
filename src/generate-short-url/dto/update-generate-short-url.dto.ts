import { PartialType } from '@nestjs/mapped-types';
import { CreateGenerateShortUrlDto } from './create-generate-short-url.dto';

export class UpdateGenerateShortUrlDto extends PartialType(CreateGenerateShortUrlDto) {}
