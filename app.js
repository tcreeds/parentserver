var r = require('ramda'),
    express = require('express'),
    bodyparser = require('body-parser'),
    router = require('./router.js')(express);

var config = {
    'projectDir': process.env.PS_PROJECT_DIR,
    'testapp': {
        localPath: 'testapp',
        uri: '/test'
    }
}

var app = express(),
    subAppList = [],
    routerDict = {};

app.use('/', router);

router.get('/', express.static('public'));

var requireApp = function(name){
    return require(config.projectDir + '/' + config[name].localPath + '/app.js')(express, config[name]);
};

function addRoute(app){
    router.use(app.uri, app.router);
    return app;
}

var port = process.env.PORT || 8000;
app.listen(port);
console.log("listening on port " + port);

var addApp = r.compose(addRoute, requireApp);

addApp('testapp');


