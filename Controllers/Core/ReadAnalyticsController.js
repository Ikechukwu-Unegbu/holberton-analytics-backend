import AnalyticsModel from "../../Models/Core/AnalyticsModel.js";
import AnalyticsHelpers from "../../Utils/AnalyticsHelpers.js";
class ReadAnalyticsController {


  // async fetchAnalyticsRecords(req, res) {
  //   const {duration, siteid } = req.params;
  //   // console.log("duration: ", duration)
  //   // console.log("siteid: ", siteid)


  //   const pageSize = 50; // Number of records per page
  //   const currentPage = req.query.page || 1; // Current page number

  //   try {
  //     let query = { site: { $eq: siteid } }; // Base query to filter by the site column

  //     if (duration === "today") {
  //       const currentDate = new Date().setHours(0, 0, 0, 0); // Get the current date with time set to midnight
  //       query.createdAt = { $gte: new Date(currentDate) }; // Filter by createdAt greater than or equal to currentDate
  //     } else if (duration === "week") {
  //       const oneWeekAgo = new Date();
  //       oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); // Calculate date one week ago
  //       query.createdAt = { $gte: oneWeekAgo }; // Filter by createdAt greater than or equal to oneWeekAgo
  //     } else if (duration === "month") {
  //       const oneMonthAgo = new Date();
  //       oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); // Calculate date one month ago
  //       query.createdAt = { $gte: oneMonthAgo }; // Filter by createdAt greater than or equal to oneMonthAgo
  //     }

  //     let analyticsRecords = await AnalyticsModel.find(query)
  //       .skip((currentPage - 1) * pageSize)
  //       .limit(pageSize);

  //     //loop through analyticsRecords, and call the "getCityAndCountry" for each record passing 
  //     // long and lat values to the function, the spread the function response which is an array of [city , country]
  //     // add city and country values to the record
  //     const recordsWithLocation = await Promise.all(
  //       analyticsRecords.map(async (record) => {
  //         let [city, country] = await AnalyticsHelpers.getCityAndCountry(record.lat, record.long);
  //         return { ...record, city, country };
  //       })
  //     );

  //     return res.json(analyticsRecords); 
  //   } catch (error) {
  //     return res.status(500).json({ error: "An error occurred while fetching analytics records.: "+error });
  //   }
  // }

  async fetchAnalyticsRecords(req, res) {
    const { duration, siteid } = req.params;
  
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
  
      let analyticsRecords = await AnalyticsModel.find(query)
        .skip((currentPage - 1) * pageSize)
        .limit(pageSize);
  
      // Loop through analyticsRecords, call the "getCityAndCountry" for each record passing
      // lat and long values to the function, then spread the function response which is an array of [city, country]
      // and add city and country values to the record
      // let recordsWithLocation = await Promise.all(
      //   analyticsRecords.map(async (record) => {
      //     // let record.city = ''
      //     // let record.country =''
      //     let [city, country] = await AnalyticsHelpers.getCityAndCountry(record.lat, record.long);
      //     city = city || 'nill';
      //     country = country || 'nill';
      //     return { ...record, city, country };
      //   })
      // );
  
  
      return res.json(analyticsRecords);
    } catch (error) {
      return res.status(500).json({ error: "An error occurred while fetching analytics records: " + error });
    }
  }
  
}

export default new ReadAnalyticsController();
