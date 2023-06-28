import Analytics from "../../Models/Core/AnalyticsModel.js";
import AnalyticsModel from '../../Models/Core/AnalyticsModel.js'
import AnalyticsHelpers from "../../Utils/AnalyticsHelpers.js";
import UserHelper from "../../Utils/ModelHelpers/UserHelper.js";

class RecordAnalyticsController{


    getDashboard(request, response){
        return response.status(200).json({message: 'my name is vincent'});
    }



    async registerUnload(request, response) {
      const address = request.url;
      const [accountid, siteid] = AnalyticsHelpers.getUseridAndSiteidFromUrl(address);
      // const { requestId } = request.body;
      console.log(request.body)
      console.log("Unload fired")
      return;
    
      try {
        const analytic = await AnalyticsModel.findOne({
          site: siteid,
          'request.request_id': requestId
        });
    
        if (analytic) {
          analytic.exit.exitstatus = 'yes';
          analytic.exit.exit_number += 1;
          analytic.exit.timestamp = new Date(); // Set current timestamp
    
          await analytic.save();
          // return response.json({ message: 'Unload analytics recorded successfully.' });
          return;
        } else {
          console.log('Analytics not found for the given site and requestId.');
        } 
      } catch (error) {
        console.error('Error:', error);
        return response.status(500).json({ error: 'Failed to record unload analytics data.' + error });
      }
    }
    
    

     
      
    async registerLoad(request, response) {
      const address = request.url;
      const [accountid, siteid] = AnalyticsHelpers.getUseridAndSiteidFromUrl(address);
      const { pageTitle, requestId, pageURL, device, browser, os, referral, origin, speed, location, timestamp } = request.body;
      const urlType = AnalyticsHelpers.checkUrlType(pageURL);
    
      try {
        const { userExists, siteExists } = await UserHelper.checkUserAndSiteExist(accountid, siteid);
    
        if (userExists && siteExists) {
          const existingAnalytics = await AnalyticsModel.findOne({
            'request.request_id': requestId,
            site: siteid
          });
    
          if (existingAnalytics) {
            const existingPage = existingAnalytics.pages.find(page => page.page_url === pageURL);
    
            if (existingPage) {
              existingPage.page_number += 1;
              await existingAnalytics.save();
              return response.json({ message: 'Analytics data recorded successfully.' });
            } else {
              existingAnalytics.pages.push({
                page_url: pageURL,
                page_title: pageTitle,
                page_number: 1,
                performance: [
                  {
                    tti: speed.tti,
                    page_loadtime: speed.pageLoadTime,
                    fcp: speed.fcp,
                    fmp: speed.fmp,
                    loadeventime: speed.loadeventime,
                    tps: speed.tps
                  }
                ]
              });
              await existingAnalytics.save();
              return response.json({ message: 'Analytics data recorded successfully.' });
            }
          } else {
            const newAnalytics = new AnalyticsModel({
              owner: accountid,
              site: siteid,
              user_device: device, 
              user_os: os,
              user_browser: browser,
              pages: [
                {
                  page_url: pageURL,
                  page_title: pageTitle,
                  page_number: 1,
                  performance: [
                    {
                      tti: speed.tti,
                      page_loadtime: speed.pageLoadTime,
                      fcp: speed.fcp,
                      fmp: speed.fmp,
                      loadeventime: speed.loadeventime,
                      tps: speed.tps
                    }
                  ]
                }
              ],
              referral: referral,
              long: location.longitude,
              lat: location.latitude,
              request: [
                {
                  request_id: requestId,
                  request_returns: 1,
                  request_durations: 0,
                  expiration: new Date(new Date().getTime() + 24 * 60 * 60 * 1000) // Set expiration for 24 hours
                }
              ],
              speed: [
                {
                  page_loadtime: speed.pageLoadTime,
                  fcp: speed.fcp,
                  tti: speed.tti,
                  fmp: speed.fmp,
                  loadeventime: speed.loadeventime,
                  tps: speed.tps,
                },
              ]
            });
    
            await newAnalytics.save();
            return response.json({ message: 'Analytics data recorded successfully.' });
          }
        } else {
          console.log('User or site does not exist. Stop further processing.');
        }
      } catch (error) {
        console.error('Error:', error);
        return response.status(500).json({ error: 'Failed to record analytics data.' + error });
      }
    }
    
      

    registerClick(request, response){
        console.log(request.body)
    }
}


export default new RecordAnalyticsController();