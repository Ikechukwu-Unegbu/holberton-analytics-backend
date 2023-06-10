import dbClient from "../../Utils/db.js"
import SiteModel from '../../Models/Core/SiteModel.js'

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
          res.status(500).json({ message: 'Internal Server Error:' });
        }
    }
      

    async createSite(req, res) {
      const { name, url, primary, owner} = req.body;
      if(!name || !url || !primary){
        return res.status(400).json({ message: 'Please fill in all required fields' });
      }  
      try {
        const newsite = new SiteModel({
          url:url,
          owner: owner, 
          primary:primary,
          name: name
        })    
        const createdStie = await newsite.save();

        res.status(201).json({ 
          message: "Site created successfully",  
          site: createdStie
        });
      } catch (error) {
          console.error("Error creating site:", error);
          res.status(500).json({ error: "Failed to create site:"+error });
      }
    }  
        
    
}

export default new SiteController()

