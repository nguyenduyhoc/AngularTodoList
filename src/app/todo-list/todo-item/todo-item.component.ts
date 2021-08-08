import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from '../models/todo.models';

const fadeStrikeThroughAnimation = trigger('fadeStrikeThrough', [
  state(
    'active',
    style({
      fontSize: '18px',
      color: 'black',
    })
  ),
  state(
    'completed',
    style({
      fontSize: '17px',
      color: 'lightgrey',
      textDecoration: 'line-through',
    })
  ),
  transition('active <=> completed', [animate(20)]),
]);

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  animations: [fadeStrikeThroughAnimation],
})
export class TodoItemComponent implements OnInit {
  @Input() todos!: Todo;
  @Output() changeStatus: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() editTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  isHover = false;
  isEditing = false;

  constructor() {}
  changeTodoStatus() {
    this.changeStatus.emit({
      ...this.todos,
      isCompleted: !this.todos.isCompleted,
    });
  }
  submitEdit(event: KeyboardEvent) {
    const { keyCode } = event;
    event.preventDefault();
    if (keyCode === 13) {
      this.editTodo.emit(this.todos);
      this.isEditing = false;
    }
    // console.log(keyCode)
  }
  removeTodo() {
    this.deleteTodo.emit(this.todos);
  }

  ngOnInit(): void {}
}
