import Analytics from "../../Models/Core/AnalyticsModel.js";
import AnalyticsHelpers from "../../Utils/AnalyticsHelpers.js";
import UserHelper from "../../Utils/ModelHelpers/UserHelper.js";

class RecordAnalyticsController{
    getDashboard(request, response){
        return response.status(200).json({message: 'my name is vincent'});
    }

    registerLoad(request, response) {
        const address = request.url
        const [accountid, siteid] = AnalyticsHelpers.getUseridAndSiteidFromUrl(address)
        const { pageTitle,requestId, pageURL,device, browser, os, referral, origin, speed, location, timestamp } = request.body;
        const urlType = AnalyticsHelpers.checkUrlType(pageURL);
        if(urlType == 'insecure' || urlType == 'unknown'){
            // send notification to the user that his site cannot be tracked since it is not secured
            return;
        }
        // check if the request id exists and less than 24hrs 

        // if it is below 24hrs, increase the page visit number

      
        UserHelper.checkUserAndSiteExist(accountid, siteid)
            .then(({ userExists, siteExists }) => {
                if (userExists && siteExists) {
                    // registering analytics since user and site exists
                    try {
                        const newAnalytics = new Analytics({
                          owner:"kdajdfdjkfa9933",
                          site:"lkdafjaklfalkfaklf",
                          
                          
                          user_device:device,
                          user_os:os ,
                          user_browser:browser,
                          pages: [
                            {
                              page_url:pageURL,
                              page_title: pageTitle,
                              page_number:1,
                              performance:[
                                  {
                                      tti:speed.tti,
                                      page_loadtime:speed.pageLoadTime,
                                      fcp:speed.fcp,
                                      fmp:speed.fmp,
                                      loadeventime:speed.loadeventime,
                                      tps:speed.tps 
                                  }
                              ]
                            }
                          ],
                          referral: referral,
                          geoLocation: {
                            type: 'Point',
                            coordinates: [location.longitude, location.latitude],
                          },
                          request: [
                            {
                              request_id: requestId,
                              request_returns: 1,
                              request_durations:0,
                              expiration: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // Set expiration for 24 hours
                            },
                          ],
                          speed:[
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
                        newAnalytics.save();
                        
                        response.json({ message: 'Analytics data recorded successfully.' });
                      } catch (error) {
                        response.status(500).json({ error: 'Failed to record analytics data.' +error});
                      }
                } else {
                console.log('User or site does not exist. Stop further processing.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

      }
      
      

    registerClick(request, response){
        console.log(request.body)
    }
}


export default new RecordAnalyticsController();