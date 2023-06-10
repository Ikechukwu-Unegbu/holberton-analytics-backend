import mongoose from 'mongoose';

const { Schema } = mongoose;

class Site {
  constructor() {
    const siteSchema = new Schema(
      {
        url: {
          type: String,
          required: [true, 'Enter full url'],
        },
        owner: {
          type: String,
          required: [true]
        },
        Primary: {
          type: String,
          required: true,
        },
        deleted: {
            type: Boolean,
            default: false,
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
