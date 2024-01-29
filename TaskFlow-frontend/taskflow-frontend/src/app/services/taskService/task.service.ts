import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Task } from 'src/app/models/task';
import { environment } from 'src/environments/environment';
import { Tag } from 'src/app/models/tag';
import { Store } from '@ngrx/store';
import * as TaskActions from '../../store/actions/task.actions';
import { TaskState } from '../../store/reducers/task.reducer';
import { User } from 'src/app/models/user';
import { TaskRequest } from 'src/app/models/task-request';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private store: Store<TaskState>) {}

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl + '/tasks');
  }

  createTask(task: TaskRequest): Observable<any> {
    console.log(task);
    return this.http.post(`${this.apiUrl}/tasks`, task, { responseType: 'text' });
  }  

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.apiUrl + '/tags');
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '/users');
  }

  getTaskById(taskId: number): Observable<Task> {
    const url = `${this.apiUrl}/tasks/${taskId}`;

    return this.http.get<Task>(url).pipe(
      tap(response => console.log('Task response:', response)),
      catchError(error => {
        console.error('Error fetching task:', error);
        return throwError(error); 
      })
    );
  }

  updateTask(taskId: number, userId: number, task: Task): Observable<Task> {
    console.log(task); 
    const url = `${this.apiUrl}/tasks/${taskId}/${userId}`;
    return this.http.put<Task>(url, task);
  }
}
