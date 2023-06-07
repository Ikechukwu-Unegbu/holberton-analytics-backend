import { Router } from "express";
import AnalyticController from '../Controllers/Core/AnalyticController';

const indexRouter = Router()

indexRouter.get('/get-stats', AnalyticController.getDashboard)



export default indexRouter;
