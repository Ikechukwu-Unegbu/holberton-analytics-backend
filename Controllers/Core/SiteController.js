import dbClient from "../../Utils/db.js"

class SiteController{
  
    async getSites(req, res) {
        const { username } = req.params;
        const { page } = req.query;
        const limit = 10;
        const skip = (page - 1) * limit;
      
        try {
          // Fetch the user by username to obtain the user ID
          const usersCollection = dbClient.db.collection('users');
          const user = await usersCollection.findOne({ username });
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          const userId = user._id;
      
          const sitesCollection = dbClient.db.collection('sites');
          const sites = await sitesCollection.find({ owner: userId }).skip(skip).limit(limit).toArray();
      
          res.status(200).json(sites);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
    }
      

    async createSite(req, res) {
        try {
          const { name, url } = req.body;
          // Get the sites collection from the connected database
          const sitesCollection = dbClient.db.collection("sites");
          // Create a new site document
          const newSite = {
            name,
            url,
            primar
          };
          // Insert the new site document into the sites collection
          const result = await sitesCollection.insertOne(newSite);    
          // Send a success response
          res.status(201).json({ message: "Site created successfully", siteId: result.insertedId });
        } catch (error) {
          console.error("Error creating site:", error);
          res.status(500).json({ error: "Failed to create site" });
        }
      }  
        
    
}

export default new SiteController()

