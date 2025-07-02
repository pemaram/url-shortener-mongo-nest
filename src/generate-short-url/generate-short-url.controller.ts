import { Controller, Get, Post, Body, Res, HttpStatus, Query , Redirect, Param} from '@nestjs/common';
import { GenerateShortUrlService } from './generate-short-url.service';
import { CreateGenerateShortUrlDto } from './dto/create-generate-short-url.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller()
export class GenerateShortUrlController {
  constructor(private readonly generateShortUrlService: GenerateShortUrlService) { }

  @Get('/:id')
  async redirect(@Res() response, @Param('id') id: string) {
    try {
      const data = await this.generateShortUrlService.redirect(id);
      return response.redirect(data.long_url)
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: err.message,
        data: null
      })
    }
  }

  @Post('api/generate-short-url')
  async upsertUrl(@Res() response, @Body() createGenerateShortUrlDto: CreateGenerateShortUrlDto) {
    try {
      const data = await this.generateShortUrlService.upsertUrl(createGenerateShortUrlDto)

      return response.status(HttpStatus.CREATED).json({
        status: true,
        message: "URL Generated Successfully",
        data
      })

    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: err.message,
        data: null
      })
    }
  }

  @Get('api/consumer-generated-urls')
  @ApiQuery({ name: 'page', required: true, type: Number, description: "Page" })
  @ApiQuery({ name: 'limit', required: true, type: Number, description: "Limit" })
  @ApiQuery({ name: 'consumer_id', required: true, type: String, description: "Consumer ID" })
  @ApiQuery({ name: 'search', required: false, type: String, description: "Search Fields" })
  async consumerGeneratedUrls(@Res() response, @Query('consumer_id') consumer_id: string = "", @Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('search') search: string = "") {
    try {
      const data = await this.generateShortUrlService.consumerGeneratedUrls(page,limit,consumer_id,search);
      return response.status(HttpStatus.ACCEPTED).json({
        status: true,
        message: "Consumer URL fetched successfully",
        data
      })
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: err.message,
        data: null
      })
    }
  }


  @Get('api/generated-url-details')
  @ApiQuery({ name: '_id', required: true, type: String, description: "_ID" })
  async generatedUrlDetails(@Res() response, @Query('_id') _id: string = "") {
    try {
      const data = await this.generateShortUrlService.generatedUrlDetails(_id);
      return response.status(HttpStatus.ACCEPTED).json({
        status: true,
        message: "URL details fetched successfully",
        data
      })
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: err.message,
        data: null
      })
    }
  }


  @Get('api/total-generated-urls')
  async totalGeneratedUrls(@Res() response, ) {
    try {
      const data = await this.generateShortUrlService.totalGeneratedUrls();
      return response.status(HttpStatus.ACCEPTED).json({
        status: true,
        message: "Count fetched successfully",
        data
      })
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: err.message,
        data: null
      })
    }
  }
}
