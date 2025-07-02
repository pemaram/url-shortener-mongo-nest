import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose/dist';
import * as aggregatePaginate from 'mongoose-aggregate-paginate-v2';

@Schema({ collection: 'generated-urls',timestamps: true })
export class GeneratedURL {

    // @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "consumers", index: true })
    // consumer_id: Consumer

    @Prop({ required: true, tirm: true, index: true })
    long_url: String

    @Prop({ required: false, tirm: true, index: true , unique : true})
    short_url: String

    @Prop({ required: false, tirm: true, index: true })
    location: String

    @Prop({ required: false, tirm: true, index: true })
    qr_code_url: String

    @Prop({ required: false, default : 0 })
    click_count : Number

    // @Prop({ type: [{ : String, city: String }], default: [] })
    // locations_clicked: { ip: string; city: string }[];

}

export const GeneratedURLSchema = SchemaFactory.createForClass(GeneratedURL)
GeneratedURLSchema.plugin(aggregatePaginate);