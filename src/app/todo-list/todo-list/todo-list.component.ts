import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.models';
import { TodoService } from '../services/services-todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todo$ : Observable<Todo[]> | undefined;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todo$ = this.todoService.todos$  ;
  }
  onChangeTodoStatus(todo : Todo){
    this.todoService.changeTodoStatus(todo.id, todo.isCompleted)
  }
  onEditTodo(todo : Todo){
    this.todoService.editTodo(todo.id,todo.content)
  }
  onRemoveTodo(todo:Todo){
    this.todoService.deleteTodo(todo.id)

  }

}
