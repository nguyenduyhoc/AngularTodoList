import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Filter, FilterButton } from '../models/filtering.models';
import { TodoService } from '../services/services-todo.service';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.scss'],
})
export class TodoFooterComponent implements OnInit, OnDestroy {
  filterButton: FilterButton[] = [
    {
      type: Filter.All,
      label: 'All',
      isActive: true,
    },
    {
      type: Filter.Active,
      label: 'Active',
      isActive: false,
    },
    {
      type: Filter.Completed,
      label: 'Completed',
      isActive: false,
    },
  ];
  length = 0;
  hasComplete$: Observable<boolean> | undefined;
  destroy$: Subject<null> = new Subject<null>();

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.hasComplete$ = this.todoService.todos$.pipe(
      // hàm some() :có 1 hoặc nhiều hơn
      map((todos) => todos.some((t) => t.isCompleted)),
      // unsubscribe
      takeUntil(this.destroy$)
    );
    this.todoService.length$
      .pipe(takeUntil(this.destroy$))
      .subscribe((length) => {
        this.length = length;
      });
  }

  filter(type: Filter) {
    this.setActiveFilterBtn(type);
    this.todoService.filterTodos(type)
  }
  private setActiveFilterBtn(type: Filter) {
    this.filterButton.forEach((btn) => {
      btn.isActive = btn.type === type;
    });
  }
  clearCompleted(){
    this.todoService.clearCompleted()
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
