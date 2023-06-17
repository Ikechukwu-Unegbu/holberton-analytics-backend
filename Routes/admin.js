import { Router } from "express";
import AdminUserController from "../Controllers/Admin/AdminUserController.js";
import AdminSiteController from "../Controllers/Admin/AdminSiteController.js";

const adminRouter = Router() 

adminRouter.get('/admin/users', AdminUserController.getAllUsers)
adminRouter.get('/admin/user/:userId', AdminUserController.getUserById)
adminRouter.get('/admin/sites', AdminSiteController.getAllSites)
adminRouter.get('/admin/site/:siteId', AdminSiteController.getSiteById)



export default adminRouter 