class AdminSiteController{
    async getSites(req, res) {
        const { page } = req.query;
        const limit = 20;
        const skip = (page - 1) * limit;
    
        try {
          const sitesCollection = dbClient.db.collection('sites');
          const sites = await sitesCollection.find().skip(skip).limit(limit).toArray();
    
          res.status(200).json(sites);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      }
    
      
}

export default new AdminSiteController()