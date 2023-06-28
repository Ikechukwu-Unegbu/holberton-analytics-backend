import SiteModel from "../../Models/Core/SiteModel.js";
import UserModel from "../../Models/UserModel.js";


class AdminSiteController {

  async getSiteById(req, res) {
    try {
      const { siteId } = req.params;
      const site = await SiteModel.findById(siteId).exec();

      if (!site) {
        return res.status(404).json({ error: "Site not found." });
      }

      res.json(site);
    } catch (error) {
      res.status(500).json({ error: "Failed to get site." });
    }
  }


  // Get all sites with pagination
  async getAllSites(req, res) {
    try {
      const { page, limit } = req.query;
      const sites = await SiteModel.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

      const totalCount = await SiteModel.countDocuments().exec();

      const totalPages = Math.ceil(totalCount / limit); 

      res.json({
        sites,
        pagination: {
          page,
          limit,
          totalCount,
          totalPages,
        },
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to get sites." });
    }
  }

  // Delete a site by ID
  async deleteSite(req, res) {
    try {
      const { siteId } = req.params;
      await SiteModel.findByIdAndDelete(siteId).exec();
      res.json({ message: "Site deleted successfully." });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete site." });
    }
  }

  // Create a new site
  async createSite(req, res) {
    try {
      const siteData = req.body;
      const newSite = await SiteModel.create(siteData);
      res.status(201).json(newSite);
    } catch (error) {
      res.status(500).json({ error: "Failed to create site." });
    }
  }

  // Update site information
  async updateSite(req, res) {
    try {
      const { siteId } = req.params;
      const siteData = req.body;
      await SiteModel.findByIdAndUpdate(siteId, siteData).exec();
      res.json({ message: "Site updated successfully." });
    } catch (error) {
      res.status(500).json({ error: "Failed to update site." });
    }
  }

  async getSiteByUser(req, res) {
    try {
      const { userid } = req.params;
      const user = await UserModel.findById(userid);
  
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
  
      const sites = await SiteModel.find({ owner: user.email });
  
      res.json(sites);
    } catch (error) {
      res.status(500).json({ error: "Failed to get sites by user. ::"+error });
    }
  }
  
  


}

export default new AdminSiteController();
