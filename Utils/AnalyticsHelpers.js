
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
      
}

export default new AnalyticsHelper();