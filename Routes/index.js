import { Router } from "express";
import AnalyticController from "../Controllers/Core/AnalyticController.js"
import SiteController from '../Controllers/Core/SiteController.js'
import AuthController from "../Controllers/Auth/AuthController.js";
import UserController from "../Controllers/User/UserController.js";
const indexRouter = Router()


// const analyticsController = new AnalyticController


indexRouter.get('/', (req, res) => {
    res.send('Hello NODE API') 
})
indexRouter.get('/test', AnalyticController.getDashboard);



export default indexRouter;
