import { Router } from "express";
import AdminUserController from "../Controllers/Admin/AdminUserController.js";
import AdminSiteController from "../Controllers/Admin/AdminSiteController.js";
import AdminAnalyticsReaderController from "../Controllers/Admin/AdminAnalyticsReaderController.js";
import InsightController from "../Controllers/Admin/InsightController.js";

const adminRouter = Router() 

adminRouter.get('/admin/users', AdminUserController.getAllUsers)
adminRouter.get('/admin/user/:userId', AdminUserController.getUserById)
adminRouter.get('/admin/sites', AdminSiteController.getAllSites)
adminRouter.get('/admin/user-sites/:userid', AdminSiteController.getSiteByUser);
adminRouter.get('/admin/site/:siteId', AdminSiteController.getSiteById)
adminRouter.get('/admin/metrics', InsightController.getInsights)




export default adminRouter 