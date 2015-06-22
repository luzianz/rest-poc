/// <reference path="../../typings/restify/restify" />
/// <reference path="../../typings/sequelize/sequelize" />
/// <reference path="../../typings/node/node" />
/// <reference path="../../models/Todo" />
/// <reference path="restify" />
/// <reference path="../rest" />

import restify = require('restify');
import rest = require('../rest');

export function configureRoutes(server, repository) {
	function injectRepository(req, res, next) {
		req.repository = repository;
		next();
	}

	server.get('/api/todos', injectRepository, rest.index);
	server.get('/api/todos/:id', injectRepository, rest.get);
	server.post('/api/todos', injectRepository, rest.create);
	server.del('/api/todos/:id', injectRepository, rest.del);
	server.put('/api/todos/:id', injectRepository, rest.modify);
}