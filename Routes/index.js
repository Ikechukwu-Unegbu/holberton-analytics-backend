import { Router } from "express";
import VerifyToken from "../Middlewares/VerifyTokenMiddleware.js";
import RecordAnalyticsController from "../Controllers/Core/RecordAnalyticsController.js"
import SiteController from '../Controllers/Core/SiteController.js'
import AuthController from "../Controllers/Auth/AuthController.js";
import UserController from "../Controllers/User/UserController.js";
import RegisterController from "../Controllers/Auth/RegisterController.js";
import dbClient from '../Utils/db.js'
const indexRouter = Router()




indexRouter.get('/', (req, res) => {
    // console.log(dbClient.db)
    res.json({message:'Hello NODE API'}) 
})
indexRouter.get('/test', RecordAnalyticsController.getDashboard);
indexRouter.post('/post_site/:username', SiteController.createSite)
indexRouter.get('/all-sites/:username', SiteController.getSites)

// User reg
indexRouter.post('/register', RegisterController.createUser)
indexRouter.post('/login', AuthController.login)

// Analytics
indexRouter.post('/register-load/:userid/:requestid', RecordAnalyticsController.registerLoad)
indexRouter.post('/register-event/:user/:requestid', RecordAnalyticsController.registerClick)



export default indexRouter;
