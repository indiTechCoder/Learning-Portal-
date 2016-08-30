'use strict';

var Hapi = require('hapi'),
Good = require('good'),
Path = require('path'),
Bell = require('bell'),
HapiMongoose = require('hapi-mongoose-db-connector'),
CookieAuth = require('hapi-auth-cookie'),
pgk = require('../package.json'),
corsHeaders = require('hapi-cors-headers')
var WebpackPlugin =  require('hapi-webpack-plugin');
var Webpack = require('webpack')
/**
 * Server Config
 **/
 var server = new Hapi.Server({
 	connections: {
 		routes: {
 			files: {
 				relativeTo: Path.join(__dirname, 'public')
 			},
 			cors: {
 				origin: ['*'],
 				additionalHeaders: ['cache-control', 'x-requested-with']
 			},
 			payload: {
        maxBytes: 10 * 1024 * 1024 // 10MB
    }
}
}
});
 server.connection({port: 5000});

 const compiler = new Webpack({
  // webpack configuration 
  entry: './src/index.js'
});
 
 const assets = {
  // webpack-dev-middleware options 
  // See https://github.com/webpack/webpack-dev-middleware 
}

const hot = {
  // webpack-hot-middleware options 
  // See https://github.com/glenjamin/webpack-hot-middleware 
}
//server.ext('onPreResponse', corsHeaders)
/**
 * Plugins
 **/
  //Setup the social Twitter login strategy
  // configure document using hapi-swagger
  server.register([
  	{register: require('hapi-swagger'),
  	options: {
  		apiVersion: pgk.version,
  		pathPrefixSize: 3
  	}
  },
  {register: WebpackPlugin,
  	 options: {compiler, assets, hot}},
  // register HapiMongoose db connector 
  {register: HapiMongoose,
  	options: {
  		mongodbUrl: 'mongodb://localhost:27017/hapi-degree'
  	}
  },
  {register: Bell},
  {register: CookieAuth},
  {register: Good,
  	options: {
  		reporters: [{
  			reporter: require('good-console'),
  			args:[{ log: '*', response: '*' }]
  		}]
  	}
  }
  ], function (err) {
  	if(err) {
  		throw err;
  	}
  /**
   * Start Server
   **/
   server.start(function () {
   	server.log('info', 'Server running at: ' + server.info.uri);
   });
});

/**
 * Views
 **/

 server.views({
 	engines: {
 		html: require('handlebars')
 	},
 	isCached : false,
 	path: Path.join(__dirname, '/Resourcify')
 });

/**
 * Routes
 **/

// Authentication Routes
server.route(require('./routes/auth'));
// API Routes
server.route(require('./routes/api'));
// Serve Static Directory
server.route({
	method: 'GET',
	path: '/{param*}',
	handler: {
		directory: {
			path: Path.join(__dirname, 'Resourcify'),
			listing: true
		}
	}
});



/*
app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

*/