import AnalyticsModel from "../../Models/Core/AnalyticsModel.js";

class ReadAnalyticsController {
  async fetchAnalyticsRecords(req, res) {
    const {duration, siteid } = req.params;
    console.log("duration: ", duration)
    console.log("siteid: ", siteid)


    const pageSize = 50; // Number of records per page
    const currentPage = req.query.page || 1; // Current page number

    try {
      let query = { site: { $eq: siteid } }; // Base query to filter by the site column

      if (duration === "today") {
        const currentDate = new Date().setHours(0, 0, 0, 0); // Get the current date with time set to midnight
        query.createdAt = { $gte: new Date(currentDate) }; // Filter by createdAt greater than or equal to currentDate
      } else if (duration === "week") {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); // Calculate date one week ago
        query.createdAt = { $gte: oneWeekAgo }; // Filter by createdAt greater than or equal to oneWeekAgo
      } else if (duration === "month") {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); // Calculate date one month ago
        query.createdAt = { $gte: oneMonthAgo }; // Filter by createdAt greater than or equal to oneMonthAgo
      }

      const analyticsRecords = await AnalyticsModel.find(query)
        .skip((currentPage - 1) * pageSize)
        .limit(pageSize);

      return res.json(analyticsRecords);
    } catch (error) {
      return res.status(500).json({ error: "An error occurred while fetching analytics records." });
    }
  }
}

export default new ReadAnalyticsController();
