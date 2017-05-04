function mainRouter(express){
    
    var router = express.Router();
    
    router.use(express.static('./'))

    router.get('/listSubApps', function(req, res){
        var jsonList = JSON.stringify(subAppList);
        res.json(jsonList);
    })
    
    return router;
}

module.exports = mainRouter;