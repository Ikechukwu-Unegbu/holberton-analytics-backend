import dbClient from '../../Utils/db.js'
import UserModel from '../../Models/UserModel.js'

class RegisterController{

    async createUser(req, res) {
        const { username, email, password, fullname } = req.body;
    
        // Validate input fields
        if (!username || !email || !password || !fullname) {
          return res.status(400).json({ message: 'Please fill in all required fields' });
        }
    
        try {
          // Create the new user
          const newUser = new UserModel({
            username: username,
            email: email,
            fullname: fullname,
            password: password,
          });
    
          const createdUser = await newUser.save();
    
          res.status(201).json(createdUser);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      }
}

export default new RegisterController()