import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Todo } from '../resources/data/foo-object'
@inject(Router, Todo)
export class Todos { //note this pg's export class is Todos
	constructor(router, todos) {
		this.router = router;
		this.todos = todos;
		this.message = 'Todos';
		this.showtodoForm = false;
	}

async activate() {
	await this.getTodos();
}

attached() {
	feather.replace()
}

async getTodos() {
	await this.todos.getTodos();
}

	newTodo() {
		this.todo = {
			todo: "",
			priotity: "Low", //since this is an enum create a default value of Low
			done: false //setting default boolean to false
		}
		this.showtodoForm = true;
	}

	editTodo(todo) {//not entirely sure this is needed
        this.todo = todo;
        this.showtodoForm();
    }

    showTodoForm() {
        this.showtodoForm = true;
        setTimeout(() => { $("#todo").focus(); }, 500);
    }

    changeDone(todo) {
        this.todo = todo;
        this.save();
    }

	async save() {
		if (this.todo && this.todo.todo && this.todo.priotity
			&& this.todo.done) {
			await this.todos.saveTodo(this.todo);
			await this.getTodos();
			this.back();
		}
	}

	async delete() {
        if (this.todo) {
            await this.todos.delete(this.todo);
            await this.getTodos();
            this.back();
        }
    }

    back() {
        this.showtodoForm = false;
    }


}//stuff goes inside here
