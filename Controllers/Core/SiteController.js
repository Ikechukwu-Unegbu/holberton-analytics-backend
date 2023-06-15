// import dbClient from "../../Utils/db.js"
import UserModel from '../../Models/UserModel.js';
import SiteModel from '../../Models/Core/SiteModel.js'

class SiteController{
  
  async getSites(req, res) {
    const { userid } = req.params;

    try {
      // Fetch the user with the given userid
      const user = await UserModel.findById(userid);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Fetch all sites where the owner's email matches the user's email
      const sites = await SiteModel.find({ owner: user.email });

      res.json(sites);
    } catch (error) {
      console.error("Error fetching sites:", error);
      res.status(500).json({ error: "Failed to fetch sites" });
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

