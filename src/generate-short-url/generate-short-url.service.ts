import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGenerateShortUrlDto } from './dto/create-generate-short-url.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { GeneratedURL } from './entities/generate-short-url.entity';
const { nanoid } = require('fix-esm').require('nanoid');
import utils from '../utils'

@Injectable()
export class GenerateShortUrlService {

  constructor(@InjectModel(GeneratedURL.name) private urlModel: Model<GeneratedURL>) { }

  async upsertUrl(createGenerateShortUrlDto: CreateGenerateShortUrlDto) {
    let data: any
    const { _id, conusmer_id, long_url, location } = createGenerateShortUrlDto
    const checkUrlExists = _id ? await this.checkUrlExists(_id) : null
    const generateShortUrl = nanoid(8)
    const payload = {
      conusmer_id,
      long_url,
      location,
    }

    if (checkUrlExists) {
      data = await this.urlModel.findByIdAndUpdate(new mongoose.Types.ObjectId(checkUrlExists._id), { $set: payload }, { new: true })
    } else {
      const createUrl = new this.urlModel({ ...payload, short_url: generateShortUrl })
      data = await createUrl.save()
    }

    return data
  }

  async checkUrlExists(_id: string) {

    const query: any = {}
    if (_id) {
      query._id = new mongoose.Types.ObjectId(_id)
    }
    const data = await this.urlModel.findOne(query)
    return data ? data : null

  }

  async consumerGeneratedUrls(page: number, limit: number, consumer_id: string, search: string) {
    const _page = utils.convertedValue(page)
    const _limit = utils.convertedValue(limit)
    const skip = (_page - 1) * _limit;


    const query: any = {}

    if (consumer_id) {
      query.consumer_id = new mongoose.Types.ObjectId(consumer_id)
    }

    const data = await this.urlModel.aggregate([
      {
        $match: {
          query
        }
      },
      {
        $project: {
          _id: 1,
          long_url: 1,
          short_url: 1,
          qr_code: 1,
          click_count: 1,
          createdAt: 1,
          updatedAt: 1
        }
      },
      {
        $sort: {
          createdAt: -1
        }
      },
      { $skip: skip },
      { $limit: _limit }
    ])

    return data
  }

  async generatedUrlDetails(_id: string) {

    const data = await this.urlModel.findOne({ _id: new mongoose.Types.ObjectId(_id) })

    if (!data) {
      throw new HttpException(`URL details not found`, HttpStatus.BAD_REQUEST);
    }

    return data
  }


  async redirect(id: string) {
    const data = await this.urlModel.findOne({ short_url: id })
    if (!data) {
      throw new HttpException(`Error While Redirecting`, HttpStatus.BAD_REQUEST);
    }

    return data
  }

  async totalGeneratedUrls() {
    const data = await this.urlModel.countDocuments()
    return data
  }

}
