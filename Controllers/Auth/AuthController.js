import AccesstokenModel from "../../Models/AccesstokenModel.js";
import AccessToken from "../../Models/AccesstokenModel.js";
import UserModel from "../../Models/UserModel.js";
import GenericHelper from "../../Utils/GenericHelper.js";

class AuthController{
    async login(request, response) {
        try {
          const { username, password } = request.body;
    
          // Check if the user exists
          const user = await UserModel.findOne({ username });
          if (!user) {
            return response.status(404).json({ error: 'User not found' });
          }
    
          // Perform authentication logic (e.g., compare passwords)
          const isAuthenticated = await user.authenticate(password);
          if (!isAuthenticated) {
            return response.status(401).json({ error: 'Authentication failed' });
          }
    
          // Generate and save access token
          const accessToken = new AccesstokenModel({
            name: 'login',
            owner:user._id,
            token: GenericHelper.generateRandomToken(64),
            token_type: 'web',
            token_expiration: GenericHelper.calculateTokenExpiration(7),
          });
    
          await accessToken.save();
    
          // Return the access token to the client
          return response.json({ accessToken: accessToken.token, user:user });
        } catch (error) {
          console.error('Error during login:', error);
          return response.status(500).json({ error: 'Internal server errors' });
        }
      }


      async logout(request, response) {
        try {
          const token = request.headers.authorization; // Assuming the token is sent in the 'Authorization' header
    
          // Check if the token is present
          if (!token) {
            return response.status(401).json({ error: 'Unauthorized' });
          }
    
          // Delete the access token from the database
          const deletedToken = await AccessToken.findOneAndDelete({ token });
    
          if (!deletedToken) {
            return response.status(404).json({ error: 'Token not found' });
          }
    
          return response.json({ message: 'Logout successful' });
        } catch (error) {
          console.error('Error during logout:', error);
          return response.status(500).json({ error: 'Internal server error - '+error });
        }
      }
}

export default new AuthController;