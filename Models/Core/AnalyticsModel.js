import mongoose from 'mongoose';

const { Schema } = mongoose;

class Analytics {
  constructor() {
    
    const SpeedSchema = new Schema({
      page_loadtime:{ 
        type:Schema.Types.Mixed,
        required:false,
      },
      fcp:{
        type:Schema.Types.Mixed,
        required:false, 
      }, 
      tti:{
        type: Schema.Types.Mixed, 
        required:false, 
      }, 
      fmp:{
        type: Schema.Types.Mixed,
        required:false
      },
      loadeventime:{
        type:Schema.Types.Mixed,
        required:false,
      },
      tps:{
        type: Schema.Types.Mixed, 
        required:false
      },
    });


    const PageSchema = new Schema({
        page_url: {
          type: String,
          required: true,
        },
        page_title: {
          type: String,
          required: true,
        },
        page_number:{
            type:Number,
            required:false,
            default:1
        },
        performance: {
            type: [SpeedSchema],
            required: false,
        },
        // speed: {
        //     type: [SpeedSchema],
        //     required: false,
        // },
    });

    const RequestSchema = new Schema({
        request_id:{
            type:String, 
            required:true
        },
        request_returns:{
            type:String, 
            required:false,
            default:1
        },
        request_durations:{
            type:[Number],
            required:false,
            default:0
        },
        expiration: {
            type: Date,
            required: false,
        },
    })

    const AnalyticsSchema = new Schema(
      {
        owner:{
          type:String, 
          required:true,
        },
        site:{
          type:String,
          required:true 
        },
        request: [RequestSchema],
        referral: {
            type: String,
            required: [false],
        },
       user_os:{
        type: Schema.Types.Mixed,
        required: true,
        default: {},
       },
        user_browser:{
          type:String, 
          required:false,
        },
        user_device:{
          type:String,
          required:false
        },
        geoLocation: {
            type: {
              type: String,
              enum: ['Point'],
              required: false,
            },
            coordinates: {
              type: [Number],
              required: false,
            },
        },
        pages: [PageSchema],

      },
      {
        timestamps: true,
      }
    );
    // AnalyticsSchema.index({ geoLocation: '2dsphere' });
    this.model = mongoose.model('Analytics', AnalyticsSchema);
  }
}

export default new Analytics().model;
