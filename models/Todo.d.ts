interface NewTodo {
	title: string;
	description: string;
	state: number;
}

interface Todo extends NewTodo {
	id: number;
	updatedAt: Date;
	createdAt: Date;
}