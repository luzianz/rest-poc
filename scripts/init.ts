/// <reference path="../schemas/sequelize_schema" />

import SequelizeSchema = require('../schemas/sequelize_schema');

var schema = new SequelizeSchema('data.db');
var Todos = schema.getTodos();
var TodoStates = schema.getTodoStates();

TodoStates.sync({ force: true }).then(function() {
	console.log('TodoStates.sync');
	TodoStates.create({
		id: 0,
		name: 'OnHold'
	});
	TodoStates.create({
		id: 1,
		name: 'InProgress'
	});
	TodoStates.create({
		id: 2,
		name: 'Complete'
	});
}).then(function() {
	return Todos.sync({ force: true });
}).then(function() {
	console.log('Todos.sync');
	return Todos.create({
		title: 'Complete Me',
		description: 'All you gotta do is mark me as complete, bro.',
		state: 0 // TodoState
	});
}).then(function() {
	console.log('Todos.create');
	return Todos.findAll();
}).then(function(todos) {
	console.log('Todos.findAll');
	todos.forEach(function(todo) {
		console.log('%d: %s, %j', todo.id, todo.title, todo.createdAt);
	});
});