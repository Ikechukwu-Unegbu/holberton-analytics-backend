import mongoose from 'mongoose';

const { Schema } = mongoose;

class Analytics {
  constructor() {
    
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
            required:true,
            default:1
        },
        performance: {
            type: Number,
            required: false,
        },
        speed: {
            type: Number,
            required: false,
        },
    });

    const RequestSchema = new Schema({
        request_id:{
            type:String, 
            required:true
        },
        request_returns:{
            type:String, 
            required:true,
            default:1
        },
        request_durations:{
            type:[Number],
            required:true,
            default:0
        },
        expiration: {
            type: Date,
            required: true,
        },
    })

    const AnalyticsSchema = new Schema(
      {
        request: [RequestSchema]
        referral: {
            type: String,
            required: [false],
        },
        primary: {
          type: Number,
          required: true,
          default:1
        },
        user_agent:{
         type:String, 
         required:true,   
        },
        geoLocation: {
            type: {
              type: String,
              enum: ['Point'],
              required: true,
            },
            coordinates: {
              type: [Number],
              required: true,
            },
        },
        pages: [PageSchema],

      },
      {
        timestamps: true,
      }
    );
    AnalyticsSchema.index({ geoLocation: '2dsphere' });
    this.model = mongoose.model('Analytics', AnalyticsSchema);
  }
}

export default new Analytics().model;
