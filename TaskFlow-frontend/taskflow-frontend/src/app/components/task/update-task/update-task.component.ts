import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as TaskActions from 'src/app/store/actions/task.actions';
import { TaskState, selectSelectedTask } from 'src/app/store/reducers/task.reducer';
import { TaskSelectors } from 'src/app/store/selectors/task.selectors';
import { TaskRequest } from 'src/app/models/task-request';
import { TaskService } from 'src/app/services/taskService/task.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  updateTaskForm: FormGroup;
  tags$ = this.store.pipe(select(TaskSelectors.selectTags));
  users$ = this.store.pipe(select(TaskSelectors.selectUsers));
  taskId!: number;
  userId!: number;

  constructor(private formBuilder: FormBuilder, private store: Store<TaskState>, private taskService: TaskService, private route: ActivatedRoute,
    private router: Router) {
    this.updateTaskForm = this.formBuilder.group({
      title: ["", [Validators.required]],
      description: ["", [Validators.required]],
      priority: ["", [Validators.required]],
      dueDate: [new Date(), [Validators.required]],
      startDate: [new Date(), [Validators.required]],
      tags: [[]],
      status: ["", [Validators.required]],
      assignedTo: ["", [Validators.required]],
      createdBy: ["", [Validators.required]],
    });
  }

ngOnInit(): void {
  this.store.dispatch(TaskActions.loadTags());
  this.store.dispatch(TaskActions.loadUsers());

  const taskData = history.state.taskData;

  if (taskData) {
    console.log(taskData);
    console.log(taskData.tags[0].name);
    console.log(taskData.tags[0].id);
    
    
    
    this.updateTaskForm.patchValue({      
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      status: taskData.status,
      startDate: taskData.startDate,
      dueDate: taskData.dueDate,
      assignedTo: taskData.assignedTo.id,
      createdBy: taskData.createdBy.id,
      tags: taskData.tags[0].id,
    });
  }

  this.route.params.subscribe((params) => {
    this.taskId = +params['taskId'];
    this.userId = +params['userId'];
  });
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
      title: this.updateTaskForm.value.title,
      description: this.updateTaskForm.value.description,
      priority: this.updateTaskForm.value.priority,
      status: this.updateTaskForm.value.status,
      startDate: this.formatValue(new Date(this.updateTaskForm.value.startDate)),
      dueDate: this.formatValue(new Date(this.updateTaskForm.value.dueDate)),
      createdByUserId: this.updateTaskForm.value.createdBy,
      assignedToUserId: this.updateTaskForm.value.assignedTo,
      tagIds: [this.updateTaskForm.value.tags]
    };

    console.log('Task Form Value:', taskFormValue);

    this.store.dispatch(TaskActions.updateTask({ taskId: this.taskId, userId: this.userId, task: taskFormValue }));
    this.router.navigate(['/tasks']);
    
  }
}