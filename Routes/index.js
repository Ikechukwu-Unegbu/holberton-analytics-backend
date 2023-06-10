import { Router } from "express";
import AnalyticController from "../Controllers/Core/AnalyticController.js"
import SiteController from '../Controllers/Core/SiteController.js'
import AuthController from "../Controllers/Auth/AuthController.js";
import UserController from "../Controllers/User/UserController.js";
import RegisterController from "../Controllers/Auth/RegisterController.js";
import dbClient from '../Utils/db.js'
const indexRouter = Router()




indexRouter.get('/', (req, res) => {
    // console.log(dbClient.db)
    res.send('Hello NODE API') 
})
indexRouter.get('/test', AnalyticController.getDashboard);
indexRouter.post('/post_site/:username', SiteController.createSite)
indexRouter.get('/all-sites/:username', SiteController.getSites)

// User reg
indexRouter.post('/register', RegisterController.createUser)

export default indexRouter;
