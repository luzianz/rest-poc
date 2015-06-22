/// <reference path="../../typings/restify/restify" />
/// <reference path="../../typings/sequelize/sequelize" />
/// <reference path="../../typings/node/node" />
/// <reference path="../../models/Todo" />

declare module 'restify' {
	import Sequelize = require('sequelize');
	
	export interface Request {
		repository: Sequelize.Model<Todo, NewTodo>;
	}
}