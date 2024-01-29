import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as TaskActions from 'src/app/store/actions/task.actions';
import { TaskState } from 'src/app/store/reducers/task.reducer';
import { TaskSelectors } from 'src/app/store/selectors/task.selectors';
import { TaskRequest } from 'src/app/models/task-request';
import { TaskService } from 'src/app/services/taskService/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  createTaskForm: FormGroup;
  tags$ = this.store.pipe(select(TaskSelectors.selectTags));
  users$ = this.store.pipe(select(TaskSelectors.selectUsers));

  constructor(private formBuilder: FormBuilder, private store: Store<TaskState>, private taskService: TaskService, private router: Router) {
    this.createTaskForm = this.formBuilder.group({
      title: ["", [Validators.required]],
      description: ["", [Validators.required]],
      priority: ["", [Validators.required]],
      status: ["", [Validators.required]],
      dueDate: [new Date(), [Validators.required]],
      startDate: [new Date(), [Validators.required]],
      tags: [[]],
      assignedTo: ["", [Validators.required]],
      createdBy: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.store.dispatch(TaskActions.loadTags());
    this.store.dispatch(TaskActions.loadUsers());
  }

  formatValue(value: any): any {
    if (value instanceof Date) {
      const year = value.getFullYear();
      const month = (value.getMonth() + 1).toString().padStart(2, '0');
      const day = value.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    } else if (typeof value === 'string') {
      const numericValue = parseFloat(value);
      return isNaN(numericValue) ? value : numericValue;
    }
    return value;
  }

  onSubmit() {
    const taskFormValue: TaskRequest = {
      title: this.createTaskForm.value.title,
      description: this.createTaskForm.value.description,
      priority: this.createTaskForm.value.priority,
      status: "IN_PROGRESS",
      startDate: this.formatValue(new Date(this.createTaskForm.value.startDate)),
      dueDate: this.formatValue(new Date(this.createTaskForm.value.dueDate)),
      createdByUserId: this.createTaskForm.value.createdBy,
      assignedToUserId: this.createTaskForm.value.assignedTo,
      tagIds: [this.createTaskForm.value.tags]
    };

    console.log('Task Form Value:', taskFormValue);

    this.store.dispatch(TaskActions.createTask({ task: taskFormValue }));
    this.router.navigate(['/tasks']);
  }
}