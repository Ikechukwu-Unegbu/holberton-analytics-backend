import { Router } from "express";
import AdminUserController from "../Controllers/Admin/AdminUserController.js";
import AdminSiteController from "../Controllers/Admin/AdminSiteController.js";

const adminRouter = Router()

adminRouter.get('/admin/users', AdminUserController.getUsers)
adminRouter.get('/admin/user/:username', AdminUserController.getUserDetail)
adminRouter.get('/admin/all-sites', AdminSiteController.getSites)


export default adminRouter 