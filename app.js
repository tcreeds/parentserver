var express = require('express'),
    bodyparser = require('body-parser'),
    router = require('./router.js')(express);

var $project_dir = process.env.PS_PROJECT_DIR,
    app = express(),
    subAppList = [],
    routerDict = {};

app.use('/', router);

router.get('/', express.static('public'));

console.log($project_dir);

function addSubApp(localPath)
{
    var subapp = require($project_dir + '/' + localPath + '/app.js')(express);
    router.use(subapp.uri, subapp.router);
    console.log('added router to ' + subapp.uri + ' ' + subapp.router);
}

var port = process.env.PORT || 8000;
app.listen(port);
console.log("listening on port " + port);

addSubApp('testapp');


