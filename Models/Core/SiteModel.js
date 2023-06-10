import mongoose from 'mongoose';

const { Schema } = mongoose;

class Site {
  constructor() {
    const siteSchema = new Schema(
      {
        name:{
          type:String,
          required:true,
        },
        url: {
          type: String,
          required: [true, 'Enter full url'],
        },
        owner: {
          type: String,
          required: [true]
        },
        primary: {
          type: String,
          required: true,
        },
        deleted: {
            type: Boolean,
            default: false,
            required:false 
          },
      },
      {
        timestamps: true,
      }
    );

    this.model = mongoose.model('Site', siteSchema);
  }
}

export default new Site().model;
