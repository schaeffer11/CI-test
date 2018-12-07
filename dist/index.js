'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var morgan = _interopDefault(require('morgan'));
var bodyParser = _interopDefault(require('body-parser'));
var compression = _interopDefault(require('compression'));
var cors = _interopDefault(require('cors'));
var helmet = _interopDefault(require('helmet'));
var express = require('express');
var express__default = _interopDefault(express);

var config = {
  theme: 'light',
  title: 'Test',
  ports: {
    http: 3010,
    io: 8090,
  },
};

var name = "test";
var version = "0.0.1";
var description = "test";
var main = "dist/index.js";
var scripts = {
	test: "mocha --require babel-core/register",
	start: "node dist/index.js",
	"start:server": "babel-node ./server/index.js",
	"watch:server": "nodemon ./server/index.js --exec babel-node",
	"build:server": "rollup -c rollup.server.js"
};
var repository = {
	type: "git",
	url: "https://github.com/schaeffer11/CI-test.git"
};
var author = "Schaeffer Reed";
var license = "UNLICENSED";
var dependencies = {
	apicache: "^1.2.3",
	"body-parser": "^1.18.3",
	compression: "^1.7.3",
	cors: "^2.8.5",
	express: "^4.16.4",
	helmet: "^3.15.0",
	mocha: "^5.2.0",
	moment: "^2.22.2",
	"moment-precise-range-plugin": "^1.3.0",
	mongodb: "^2.2.33",
	morgan: "^1.9.1",
	request: "^2.88.0",
	supertest: "^3.3.0"
};
var devDependencies = {
	"babel-cli": "^6.26.0",
	"babel-core": "^6.26.3",
	"babel-eslint": "^10.0.1",
	"babel-loader": "^8.0.4",
	"babel-plugin-external-helpers": "^6.22.0",
	"babel-plugin-transform-decorators-legacy": "^1.3.5",
	"babel-polyfill": "^6.26.0",
	"babel-preset-env": "^1.7.0",
	"babel-preset-stage-3": "^6.24.1",
	eslint: "^5.9.0",
	"eslint-config-airbnb": "^17.1.0",
	"eslint-plugin-import": "^2.14.0",
	"eslint-plugin-jsx-a11y": "^6.1.2",
	"eslint-plugin-react": "^7.11.1",
	nodemon: "^1.18.7",
	rollup: "^0.67.4",
	"rollup-plugin-babel": "^4.0.3",
	"rollup-plugin-json": "^3.1.0",
	"rollup-plugin-replace": "^2.1.0"
};
var pkg = {
	name: name,
	version: version,
	description: description,
	main: main,
	scripts: scripts,
	repository: repository,
	author: author,
	license: license,
	dependencies: dependencies,
	devDependencies: devDependencies
};

const router = express.Router();

router.get('/test', (req, res) => {
  console.log('i got here', isProduction$1);
  res.json({ testing: true });
});

router.get('/ping', (req, res) => {
  console.log('i got here', isProduction$1);
  res.json({ res: 'pong' });
});


router.get('*', (req, res) => {
  res.status(404).send(`No API endpoint found for "${req.url}"`);
});

// CONFIG & ENVIRONMENT
const env = "production";
const PORT = process.env.PORT || config.ports.http;

// INITIALIZE APP SERVER
console.log(`initializing ${pkg.description} server in ${env} mode...`);
const app = express__default();

app.use(helmet());
app.use(helmet.noCache());

// ENABLE CORS
app.use(cors());

// ENABLE GZIP COMPRESSION
app.use(compression());

// ENABLED FORM BODY PARSING
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true,
}));

// ENABLE OUTPUT LOGGING
app.use(morgan('dev'));

// ENABLE LOGGING AND CACHE CONTROL
// app.use(logger)

app.use('/api', router);

app.get('/version', (req, res) => {
  const { name: name$$1, version: version$$1, description: description$$1 } = pkg;
  const { title } = config;
  res.json({ name: name$$1, title, description: description$$1, version: version$$1, deployed: new Date() });
});


const httpServer = app.listen(PORT, () => {
    setTimeout(function() {app.emit('app_started'); }, 300);
});

var isProduction$1 = null;

exports.app = app;
exports.httpServer = httpServer;
exports.default = isProduction$1;
