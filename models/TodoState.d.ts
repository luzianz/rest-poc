interface NewTodoState {
	id: number;
	name: string;
}

interface TodoState extends NewTodoState {
	updatedAt: Date;
	createdAt: Date;
}