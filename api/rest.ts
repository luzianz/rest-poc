/// <reference path="../typings/restify/restify.d.ts" />
/// <reference path="../typings/sequelize/sequelize.d.ts" />
/// <reference path="../typings/node/node.d.ts" />

import restify = require('restify');

// GET /api/[model]/:id
export function get(req: restify.Request, res: restify.Response, next: restify.Next) {
	req.repository.find({ where: { id: req.params.id } }).then(function (item) {
		if (item) {
			res.send(200, item);
		} else {
			res.send(404);
		}
		next();
	}, onError(req, res, next));
}

// GET /api/[model]
export function index(req: restify.Request, res: restify.Response, next: restify.Next) {
	req.repository.findAll().then(function (items) {
		res.send(200, items);
		next();
	}, onError(req, res, next));
}

// DELETE /api/[model]/:id
export function del(req: restify.Request, res: restify.Response, next: restify.Next) {
	req.repository.destroy({ where: { id: req.params.id } }).then(function (count) {
		if (count > 0) {
			res.send(200);
		} else {
			res.send(404);
		}
		next();
	}, onError(req, res, next));
}

// POST /api/[model]
export function create(req: restify.Request, res: restify.Response, next: restify.Next) {
	req.repository.create(req.body).then(function (item) {
		//res.header('location', '/api/todos/' + todo.id);
		res.send(201, item);
		next();
	}, onError(req, res, next));
}

// PUT /api/[model]/:id
export function modify(req: restify.Request, res: restify.Response, next: restify.Next) {
	req.repository.update(req.body, { where: { id: req.params.id } }).then(function () {
		res.send(200);
		next();
	}, onError(req, res, next));
}

// ----------------------------------------------------------------------------
function onError(req, res, next) {
	return function(reason) {
		res.send(500, reason);
		next();
	};
}