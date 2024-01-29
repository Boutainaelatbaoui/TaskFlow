import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TaskActions from 'src/app/store/actions/task.actions';
import * as TaskSelectors from 'src/app/store/selectors/task.selectors';
import { Task } from 'src/app/models/task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  imageHome: string = 'assets/img/dot.png';
  imageHome1: string = 'assets/img/dot1.png';
  imageHome2: string = 'assets/img/dot2.png';

  tasks$: Observable<Task[]> | undefined;
  loading$: Observable<boolean> | undefined;
  error$: Observable<any> | undefined;

  constructor(private store: Store, private router: Router) {
    this.tasks$ = this.store.select(TaskSelectors.selectTasks);
    this.loading$ = this.store.select(TaskSelectors.selectLoading);
    this.error$ = this.store.select(TaskSelectors.selectError);
  }

  ngOnInit(): void {
    this.store.dispatch(TaskActions.loadTasks());
  }

  filterTasksByStatus(tasks: Task[], status: string): Task[] {
    return tasks.filter(task => task.status === status);
  }

  navigateToUpdateForm(taskId: number) {
    this.router.navigate(['/update-task', taskId]);
  }
}
