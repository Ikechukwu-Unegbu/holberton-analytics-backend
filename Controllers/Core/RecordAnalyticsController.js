import Analytics from "../../Models/Core/AnalyticsModel.js";
import AnalyticsModel from '../../Models/Core/AnalyticsModel.js'
import AnalyticsHelpers from "../../Utils/AnalyticsHelpers.js";
import UserHelper from "../../Utils/ModelHelpers/UserHelper.js";

class RecordAnalyticsController{


    getDashboard(request, response){
        return response.status(200).json({message: 'my name is vincent'});
    }


    async registerClickEvent(request, response) {
      const address = request.url;
      const [accountid, siteid] = AnalyticsHelpers.getUseridAndSiteidFromUrl(address);
      console.log('event recieved.');
      const {
        timestamp,
        pageURL,
        page_title,
        clickCoordinates,
        elementID,
        elementText,
        eventType,
        requestId
      } = request.body;
    
      try {
        const analytics = await AnalyticsModel.findOneAndUpdate(
          {
            site: siteid,
            'request.request_id': requestId,
          },
          {
            $push: {
              events: {
                eventType: eventType,
                timestamp: timestamp,
                // clickCoordinates: clickCoordinates,
                pageURL: pageURL,
                page_title: page_title,
                elementID: elementID,
                elementText: elementText,
              },
            },
          },
          {
            new: true,
          }
        );
    
        if (!analytics) {
          console.log('Analytics not found for the given site and requestId.');
          return response.status(404).json({ error: 'Analytics not found' });
        }
    
        console.log('Event registered successfully.');
        return response.json({ message: 'Event registered successfully' });
      } catch (error) {
        console.error('Failed to register event:', error);
        return response.status(500).json({ error: 'Failed to register event' });
      }
    }
    

    async registerUnload(request, response) {
      const address = request.url;
      const [accountid, siteid] = AnalyticsHelpers.getUseridAndSiteidFromUrl(address);
      const { requestId } = request.body;
      console.log("page exited");
    
      try {
        const analytic = await AnalyticsModel.findOne({
          site: siteid,
          'request.request_id': requestId
        });
    
        if (analytic) {
          if (analytic.exit.length === 0) {
            // If the exit array is empty, add a new exit object
            analytic.exit.push({
              exitstatus: 'yes',
              exit_number: 1,
              timestamp: new Date()
            });
          } else {
            // If the exit array already has an item, update the values
            analytic.exit[0].exitstatus = 'yes';
            analytic.exit[0].exit_number += 1;
            analytic.exit[0].timestamp = new Date();
          }
    
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
    
      

    // registerClick(request, response){
    //     console.log(request.body)
    // }
}


export default new RecordAnalyticsController();