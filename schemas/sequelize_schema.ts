/// <reference path="../typings/sequelize/sequelize" />
/// <reference path="../models/Todo" />
/// <reference path="../models/TodoState" />

import Sequelize = require('sequelize');
import Lazy = require('../lib/Lazy');

class SequelizeSchema {
	private _Todos: Lazy<Sequelize.Model<Todo, NewTodo>>;
	private _TodoStates: Lazy<Sequelize.Model<TodoState, NewTodoState>>;
	private todoStateSchema;
	private todoSchema;
	
	constructor(dbFilePath: string) {
		var self = this;
		var db = new Sequelize(null, null, null, { storage: dbFilePath, dialect: 'sqlite' });

		this._Todos = new Lazy<Sequelize.Model<Todo, NewTodo>>(function() {
			return db.define<Todo, NewTodo>('todos', self.todoSchema);
		});
		this._TodoStates = new Lazy<Sequelize.Model<TodoState, NewTodoState>>(function() {
			return db.define<TodoState, NewTodoState>('todo_states', self.todoStateSchema);
		});
		
		this.todoStateSchema = {
			id: {
				primaryKey: true,
				autoIncrement: false, // manually specify ids
				type: Sequelize.INTEGER,
				field: 'id',
				allowNull: false
			},
			name: {
				type: Sequelize.STRING,
				field: 'name',
				allowNull: false,
				unique: true
			}
		};
		
		this.todoSchema = {
			id: {
				primaryKey: true,
				autoIncrement: true,
				type: Sequelize.INTEGER,
				field: 'id',
				allowNull: false
			},
			title: {
				type: Sequelize.STRING,
				field: 'title',
				allowNull: false
			},
			description: {
				type: Sequelize.STRING,
				field: 'description',
				allowNull: true
			},
			state: {
				type: Sequelize.INTEGER,
				field: 'state',
				defaultValue: 0,
				allowNull: false,
				references: {
					model: self.getTodoStates(), // This is a reference to another model
					key: 'id' // This is the column name of the referenced model
				}
			}
		};
	}
	
	public getTodos(): Sequelize.Model<Todo, NewTodo> {
		return this._Todos.getValue();
	}
	
	public getTodoStates(): Sequelize.Model<TodoState, NewTodoState> {
		return this._TodoStates.getValue();
	}
}

export = SequelizeSchema;