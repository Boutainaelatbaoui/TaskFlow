import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TaskActions from 'src/app/store/actions/task.actions';
import * as TaskSelectors from 'src/app/store/selectors/task.selectors';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  tasks$: Observable<Task[]> | undefined; // Make the type explicitly include undefined
  loading$: Observable<boolean> | undefined;
  error$: Observable<any> | undefined;

  constructor(private store: Store) {
    this.tasks$ = this.store.select(TaskSelectors.selectTasks);
    this.loading$ = this.store.select(TaskSelectors.selectLoading);
    this.error$ = this.store.select(TaskSelectors.selectError);
  }

  ngOnInit(): void {
    this.store.dispatch(TaskActions.loadTasks());
  }
}
