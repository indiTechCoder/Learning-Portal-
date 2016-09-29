// dependencies
const hapi = require('hapi');
const inert = require('inert');
const path = require('path');
Good = require('good'),
    Bell = require('bell'),
    HapiMongoose = require('hapi-mongoose-db-connector'),
    CookieAuth = require('hapi-auth-cookie'),
    pgk = require('./package.json'),
    corsHeaders = require('hapi-cors-headers');
// dev
const webpack = require('webpack');
const hapiWebpackPlugin = require('hapi-webpack-plugin');
const chokidar = require('chokidar');
const watcher = chokidar.watch('./server');

watcher.on('ready', function() {
    watcher.on('all', function() {
        console.log("Clearing /server/ module cache from server");
        Object.keys(require.cache).forEach(function(id) {
            if (/[\/\\]server[\/\\]/.test(id)) delete require.cache[id];
        });
    });
});
// constants
const webRoot = path.join(__dirname, 'client');
const serverHost = '0.0.0.0';
const serverPort = 8000;
const hapiPackages = [];
const server = new hapi.Server();
server.connection({ host: serverHost, port: serverPort });
server.register(hapiPackages, (err) => {
        if (err) {
            console.error(err);
        }
    })
    /**
     * Routes
     **/
    // Authentication Routes
server.route(require('./routes/api'));
// Serve Static Directory

server.route([{
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: webRoot
        }
    }
}])

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at ${server.info.uri}`);
})