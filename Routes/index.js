import { Router } from "express";
import VerifyToken from "../Middlewares/VerifyTokenMiddleware.js";
import RecordAnalyticsController from "../Controllers/Core/RecordAnalyticsController.js"
import SiteController from '../Controllers/Core/SiteController.js'
import AuthController from "../Controllers/Auth/AuthController.js";
import UserController from "../Controllers/User/UserController.js";
import RegisterController from "../Controllers/Auth/RegisterController.js";
import dbClient from '../Utils/db.js'
import ReadAnalyticsController from "../Controllers/Core/ReadAnalyticsController.js";
import PasswordController from "../Controllers/Auth/PasswordController.js";
const indexRouter = Router()




indexRouter.get('/', (req, res) => {
    // console.log(dbClient.db)
    res.send({message:{
        developer: "Ikechukwu Vincent",
        description: "Fll Stack Software Engineer",
        school: "Holberton School of Software Engineering",
        specialty: "Backend Engineering",
        project:"Web Traffic Analytics - Inspired by Google Analytics.",
        email: "mr.ikunegbu@gmail.com",
        phone: "08064133376",
        my_cv: "https://docs.google.com/document/d/1ATJV-kOTjYzaeg5LbeNNdkmHffP0sGWsyPguzF9uXJ4/edit?usp=sharing",
        website: "www.ikevincent.xyz"
    }}) 
})
indexRouter.get('/test', RecordAnalyticsController.getDashboard);
indexRouter.post('/post_site/:username', SiteController.createSite)
indexRouter.get('/all-sites/:userid', SiteController.getSites)

// User reg
indexRouter.post('/register', RegisterController.createUser)
indexRouter.post('/login', AuthController.login)
indexRouter.post('/forgot-password', PasswordController.forgotPassword);


// Analytics
indexRouter.post('/register-load/:userid/:requestid', RecordAnalyticsController.registerLoad)
indexRouter.post('/register-event/:user/:requestid', RecordAnalyticsController.registerClick)
indexRouter.get('/analytics/:siteid/:duration', ReadAnalyticsController.fetchAnalyticsRecords)

//users
indexRouter.get('/user/profile/:userId',VerifyToken.verifyToken, UserController.getUser);
indexRouter.post('/user/edit/:userid', UserController.editUser);
indexRouter.post('/change-password/:userid', PasswordController.changePassword);

export default indexRouter;
