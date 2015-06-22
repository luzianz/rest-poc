/// <reference path="typings/restify/restify" />
/// <reference path="typings/sequelize/sequelize" />
/// <reference path="typings/node/node" />
/// <reference path="models/Todo" />

import restify = require('restify');
import SequelizeSchema = require('./schemas/sequelize_schema');
var todos = require('./api/todos');

var schema = new SequelizeSchema('data.db');

var server = restify.createServer();
server.use(restify.bodyParser());
todos.configureRoutes(server, schema.getTodos());

server.listen(3000, function () {
	console.log('%s listening at %s', server.name, server.url);
});
