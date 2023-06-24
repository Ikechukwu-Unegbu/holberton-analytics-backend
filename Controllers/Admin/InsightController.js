import UserModel from "../../Models/UserModel.js";
import SiteModel from "../../Models/Core/SiteModel.js";
import AnalyticsModel from "../../Models/Core/AnalyticsModel.js";

class InsightController {
  async getInsights(req, res) {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to start of the day

      const totalUsers = await UserModel.countDocuments();
      const totalSites = await SiteModel.countDocuments();
      const totalAnalytics = await AnalyticsModel.countDocuments({
        createdAt: { $gte: today },
      });

      const insights = {
        totalUsers,
        totalSites,
        totalAnalytics,
      };

      return res.json(insights);
    } catch (error) {
      console.error('Error retrieving insights:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new InsightController();
