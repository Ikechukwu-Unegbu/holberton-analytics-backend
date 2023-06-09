class AnalyticController{
    getDashboard(request, response){
        return response.status(200).json({message: 'my name is vincent'});
    }
}


export default new AnalyticController();