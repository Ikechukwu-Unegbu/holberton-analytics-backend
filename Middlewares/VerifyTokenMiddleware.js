import AccesstokenModel from "../Models/AccesstokenModel.js";

class VerifyTokenMiddleware {
  async verifyToken(req, res, next) {
    const token = req.headers.authorization; // Assuming the token is sent in the 'Authorization' header

    // Check if the token is present
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      // Find the access token in the database
      const accessToken = await AccesstokenModel.findOne({ token });

      // Check if the access token exists and is not expired
      if (!accessToken || accessToken.token_expiration < Date.now()) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      // Attach the access token to the request object for further use
      req.accessToken = accessToken;

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error('Error verifying token:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new VerifyTokenMiddleware();
