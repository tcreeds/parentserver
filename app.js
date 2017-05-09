var r = require('ramda'),
    express = require('express'),
    bodyparser = require('body-parser'),
    router = require('./router.js')(express, r);

var config = {
    testapp: {
        localPath: 'testapp',
        projectDir: process.env.PS_PROJECT_DIR,
        uri: '/test'
    }
}

var app = express();

app.use('/', router);

var port = process.env.PORT || 8000;
app.listen(port);
console.log("listening on port " + port);

var addApp = function (name){
    router.addApp({
        name: name,
        config: config[name],
        projectDir: process.env.PS_PROJECT_DIR
    })
}

addApp('testapp');


