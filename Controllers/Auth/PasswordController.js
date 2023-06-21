import UserModel from "../../Models/UserModel";
import { sendEmail } from "../../Utils/email.js";

class PasswordController {
  async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      // Find the user by their email
      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: 'No user found with the provided email' });
      }

      // Generate a new password (8 alphanumeric characters)
      const newPassword = this.generateNewPassword();

      // Update the user's password
      user.password = newPassword;
      await user.save();

      // Send the new password to the user's email
      this.sendPasswordResetEmail(user.email, newPassword);

      return res.json({ message: 'New password sent to the user\'s email' });
    } catch (error) {
      console.error('An error occurred while resetting password:', error);
      return res.status(500).json({ error: 'An error occurred while resetting password' });
    }
  }

  async changePassword(req, res) {
    const { password, newpassword } = req.body;
    const { userid } = req.params;

    try {
      // Find the user by their ID
      const user = await UserModel.findById(userid);

      if (!user) {
        return res.status(404).json({ error: 'No user found with the provided ID' });
      }

      // Compare the current password with the provided password
      if (user.password !== password) {
        return res.status(401).json({ error: 'Incorrect password' });
      }

      // Update the user's password
      user.password = newpassword;
      await user.save();

      return res.json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error('An error occurred while changing password:', error);
      return res.status(500).json({ error: 'An error occurred while changing password' });
    }
  }

  generateNewPassword() {
    // Generate a random alphanumeric string of 8 characters
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let newPassword = '';
    for (let i = 0; i < 8; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return newPassword;
  }

  sendPasswordResetEmail(email, newPassword) {
    // Send an email to the user with the new password
    // Implement the email sending logic based on your preferred email service or library
    // Example: using Nodemailer library
    const mailOptions = {
      from: 'your-email@example.com',
      to: email,
      subject: 'Password Reset',
      text: `Your new password: ${newPassword}`,
    };

    sendEmail(mailOptions);
  }
}

export default new PasswordController();
