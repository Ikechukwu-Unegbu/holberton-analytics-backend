import mongoose from 'mongoose';
import crypto from 'crypto';

const { Schema } = mongoose;

class AccessToken {
  constructor() {
    const AccessTokenSchema = new Schema(
      {
        name: {
          type: String,
          required: false,
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

    this.model = mongoose.model('AccessToken', AccessTokenSchema);
  }

  // Static method to generate an access token
  static generateAccessToken() {
    const token = crypto.randomBytes(32).toString('hex');
    return token;
  }

  
  static async authenticate(token) {
    try {
      const accessToken = await this.model.findOne({ token });
      return accessToken !== null;
    } catch (error) {
      console.error('Error authenticating access token:', error);
      return false;
    }
  }

}

export default new AccessToken().model;
