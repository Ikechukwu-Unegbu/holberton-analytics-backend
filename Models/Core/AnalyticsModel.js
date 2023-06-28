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

    const EventSchema = new Schema({
      eventType: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        required: true,
      },
      clickCoordinates: {
        x: {
          type: Number,
          required: false,
          default:0
        },
        y: {
          type: Number,
          required: false,
          default:0
        }
      },
      pageURL: {
        type: String,
        required: true,
      },
      page_title: {
        type: String,
        required: false,
      },
      downloadURL: {
        type: String,
        required: false,
      },
      fileName: {
        type: String,
        required: false,
      },
      fileSize: {
        type: String,
        required: false,
      },
      fileType: {
        type: String,
        required: false,
      },
      clickText: {
        type: String,
        required: false,
      },
      submitFormId: {
        type: String,
        required: false,
      },
      submitFormData: {
        type: Schema.Types.Mixed,
        required: false,
      },
      ipAddress: {
        type: String,
        required: false,
      },
      duration: {
        type: Number,
        required: false,
      },
    });
    
    
    
    // const EventModel = mongoose.model('Event', EventSchema);
    

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
    });

    const ExitSchema = new Schema({
      exitstatus:{
          type:String, 
          required:false,
          default:'no'
      },
      exit_number:{
          type:Number, 
          required:false,
          default:0
      },
      // deets:{
      //   type: Schema.Types.Mixed,
      //   required: true,
      //   default: [],
      // },
      timestamp: {
        type: Date,
        required: false,
        default: null
      }    
    });



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
      //  exited:{
      //   type: Schema.Types.Mixed,
      //   required: false,
      //   default: {},
      //  },
        user_browser:{
          type:String, 
          required:false,
        },
        user_device:{
          type:String,
          required:false
        },
        long:{
          type:String, 
          required:false,
        },
        lat:{
          type:String, 
          required:false,
        },
        pages: [PageSchema],
        exit:[ExitSchema],
        events:[EventSchema]

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
