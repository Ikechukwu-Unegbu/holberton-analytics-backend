import UserModel from "../../Models/UserModel.js"
import SiteModel from '../../Models/Core/SiteModel.js'

class UserHelper{
    
    checkUserExists = async (userId) => {
        try {
          const user = await UserModel.findById(userId);
          return !!user; // Return true if user exists, false otherwise
        } catch (error) {
          console.error('Error checking user existence:', error);
          return false; // Return false if an error occurs
        }
    }

    checkUserAndSiteExist = async (userId, siteId) => {
        try {
          const user = await UserModel.findById(userId);
          const site = await SiteModel.findById(siteId);
          return { userExists: !!user, siteExists: !!site };
        } catch (error) {
          console.error('Error checking user and site existence:', error);
          return { userExists: false, siteExists: false };
        }
    }

}


export default new  UserHelper()