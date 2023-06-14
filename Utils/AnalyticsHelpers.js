
class AnalyticsHelper{
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
      
      // Parse the URL using the URL module
      const parsedUrl = new URL(url);
    
      // Get the path segments of the URL
      const pathSegments = parsedUrl.pathname.split('/');
    
      // Get the last two values from the path segments
      const userid = pathSegments[pathSegments.length - 2];
      const siteid = pathSegments[pathSegments.length - 1];
      return [userid, siteid]
    }
      
}

export default new AnalyticsHelper();