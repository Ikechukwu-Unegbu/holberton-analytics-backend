import mongoose from 'mongoose';

const { Schema } = mongoose;

class AccessToken {
  constructor() {
    const accessTokenSchema = new Schema(
      {
        name: {
          type: String,
          required: [false],
        },
        owner: {
          type: String,
          required: true,
        },
        token: {
          type: String,
          required: true,
        },
        token_type: {
          type: String,
          enum: ['web', 'api'],
          required: true,
        },
        last_seen: {
          type: Date,
          default: Date.now,
        },
        token_expiration: {
          type: Date,
          required: true,
        },
      },
      {
        timestamps: true,
      }
    );

    this.model = mongoose.model('AccessToken', accessTokenSchema);
  }

  async generateAccessToken(owner, type) {
    const token = new this.model({
      owner,
      token: generateRandomToken(), // Replace with your token generation logic
      token_type:type,// Example: set token_type as 'api'
      token_expiration: calculateTokenExpiration(), // Replace with your token expiration calculation logic
    });

    return token;
  }
}

export default new AccessToken().model;





