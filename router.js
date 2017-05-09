function createRouter(express, r){
    
    var router = express.Router();
    
    router.subAppList = [];
    router.subAppDict = {};
    
    router.use(express.static('./'));
    router.get('/', express.static('public'));
    
    router.get('/listSubApps', function(req, res){
        var jsonList = JSON.stringify(router.subAppList);
        res.json(router.subAppList);
    })
    
    var requireApp = (data) => 
    {
        router.subAppDict[data.name] = require(data.projectDir + '/' + data.config.localPath + '/app.js')(express, data.config);
        return data;
    }

    var addToList = (data) => 
    {
        router.subAppList.push({
            uri: data.config.uri,
            name: data.name
        });
        return data;
    }

    var addRoute = (data) => 
    {
        router.use(data.config.uri, router.subAppDict[data.name].router);
        return data;
    }
    
    router.addApp = r.compose(addRoute, addToList, requireApp);
    
    return router;
}

module.exports = createRouter;