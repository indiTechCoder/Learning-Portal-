// dependencies
const hapi = require('hapi'),
    inert = require('inert'),
    path = require('path'),
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
hapiPackages.push({
    register: hapiWebpackPlugin,
    options: './webpack.config.js'
})
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
server.ext('onPreHandler', function(req, next) {
    if (req.params.transId) {
        Item.findById(req.params.transId, function(err, item) {
            req.item = item;
            next();
        });
    } else {
        next();
    }
});

server.ext('onPreResponse', function(request, reply) {
    // if there's no error then just send the normal response
    if (!request.response.isBoom) return reply.continue();
    // get path, code, and error information from the request
    var path = request._route.path,
        code = request.response.output.payload.statusCode,
        error = request.response.output.payload.message;
    // show a custom error page based on the path
    if (path === '/signup') {
        return reply.view('signup-error').code(code);
    }
    if (path === '/login') {
        return reply.view('login-error').code(code);
    }
    // show a standard error page for any other errors
    reply.view('error').code(400); // 400 code means Bad Request
});
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