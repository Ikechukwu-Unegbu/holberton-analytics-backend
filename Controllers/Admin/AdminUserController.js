class AdminUserController {
    async getUsers(req, res) {
      const { page } = req.query;
      const limit = 20;
      const skip = (page - 1) * limit;
  
      try {
        const usersCollection = dbClient.db.collection('users');
        const users = await usersCollection.find().skip(skip).limit(limit).toArray();
  
        res.status(200).json(users);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  
    async getUserDetail(req, res) {
      const { userId } = req.params;
  
      try {
        const usersCollection = dbClient.db.collection('users');
        const user = await usersCollection.findOne({ _id: userId });
  
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        res.status(200).json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }
  
  
  export default new AdminUserController();
  