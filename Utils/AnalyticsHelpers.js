import AnalyticsModel from "../Models/Core/AnalyticsModel.js";
import fetch from "node-fetch";



class AnalyticsHelpers{
    checkUrlType(url) {
        const protocolRegex = /^(https?):\/\//;
        const domainRegex = /\.(com|org|io|net)$/;
      
        const isHttp = protocolRegex.test(url) && !url.startsWith("https://localhost");
        const isHttps = protocolRegex.test(url) && url.startsWith("https://");
      
        if (isHttp && !isHttps) {
          return "insecure";
        } else if (isHttp && url.startsWith("http://localhost")) {
          return "localhost";
        } else if (isHttps && !url.startsWith("https://localhost")) {
          return "secured";
        } else {
          return "unknown";
        }
    } 

    getUseridAndSiteidFromUrl(url){
      
      const pathSegments = url.split('/');
    
      // Get the last two values from the path segments
      const userid = pathSegments[pathSegments.length - 2];
      const siteid = pathSegments[pathSegments.length - 1];
      return [userid, siteid]
    }


    async checkRequestIdMatch(site, requestId) {
      try {
        const existingAnalytics = await AnalyticsModel.find({ site, 'request.request_id': requestId });
    
        return existingAnalytics.length > 0; // Returns true if there is a match, false otherwise
      } catch (error) {
        console.error('Error checking request ID match:', error);
        throw error;
      }
    }
      
    async checkAndIncrementPageNumber(site, request_id, url) {
      try {
        const filter = {
          site: site,
          'request.request_id': request_id,
          'pages.page_url': url
        };
        const update = { $inc: { 'pages.$.page_number': 1 } };
    
        const result = await AnalyticsModel.updateOne(filter, update);
    
        if (result.nModified > 0) {
          // At least one page was modified, so a matching page was found
          return true;
        } else {
          // No matching page was found
          return false;
        }
      } catch (error) {
        console.error('Error checking and incrementing page number:', error);
        throw error;
      }
    }
     
    
    async updateAnalyticsWithNewPage(request_id, site, owner, newPage) {
      try {
        const filter = {
          'request.request_id': request_id,
          site: site,
          owner: owner
        };
    
        const update = {
          $push: { pages: newPage }
        };
    
        const result = await AnalyticsModel.updateOne(filter, update);
    
        if (result.nModified > 0) {
          // At least one document was modified
          return true;
        } else {
          // No matching document found
          return false; 
        }
      } catch (error) { 
        console.error('Error updating analytics with new page:', error);
        throw error;
      }
    }


   
  
    getCityAndCountry(latitude, longitude) {
      const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
  
      if (longitude === '' || latitude === '') {
        return Promise.resolve(['nill', 'nill']);
      }
  
      return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const address = data.address;
          const city = address.city;
          const country = address.country;
  
          return [city, country];
        })
        .catch(error => {
          console.error("Error:", error);
          throw error;
        });
    }

    getCityAndCountry(latitude, longitude) {
      const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
    
      if (longitude === '' || latitude === '') {
        return Promise.resolve(['nill', 'nill']);
      }
    
      return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const address = data.address;
          const city = address.city || 'nill';
          const country = address.country || 'nill';
          return [city, country];
        })
        .catch(error => {
          console.error("Error:", error);
          return ['nill', 'nill'];
        });
    }
    
  
  
  

  
  
}

export default new AnalyticsHelpers();