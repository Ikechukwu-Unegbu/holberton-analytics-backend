import mongoose from 'mongoose';

const { Schema } = mongoose;

class User {
  constructor() {
    const userSchema = new Schema(
      {
        fullname: {
          type: String,
          required: [true, 'Enter full name'],
        },
        username: {
          type: String,
          required: [true, 'Enter Username'],
          default: 0,
        },
        email: {
          type: String,
          required: true,
        },
        password: {
          type: String,
          required: true,
        },
      },
      {
        timestamps: true,
      }
    );

    // Add the authenticate method to the userSchema
    userSchema.methods.authenticate = async function (password) {
      // Compare the provided password with the stored password
      return this.password === password;
    };

    this.model = mongoose.model('User', userSchema);
  }
}

export default new User().model;
