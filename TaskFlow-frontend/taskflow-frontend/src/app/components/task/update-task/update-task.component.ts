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

  constructor(private formBuilder: FormBuilder, private store: Store<TaskState>, private taskService: TaskService, private route: ActivatedRoute,
    private router: Router) {
    this.updateTaskForm = this.formBuilder.group({
      title: ["", [Validators.required]],
      description: ["", [Validators.required]],
      priority: ["", [Validators.required]],
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
  
    combineLatest([this.route.paramMap, this.store.pipe(select(selectSelectedTask))])
      .subscribe(([params, task]) => {
        const taskIdParam = params.get('taskId');
        console.log('Task ID from URL:', taskIdParam);
  
        if (taskIdParam) {
          const taskId = +taskIdParam;
          this.store.dispatch(TaskActions.loadTask({ taskId }));
        }
  
        console.log('Selected Task from NgRx State:', task);
  
        if (task) {
          this.updateTaskForm.patchValue({
            title: task.title,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            dueDate: task.dueDate,
            assignedTo: task.assignedTo.id,
            createdBy: task.createdBy.id,
            tags: task.tags.map(tag => tag.id),
          });
  
          console.log('Form Values After Patch:', this.updateTaskForm.value);
        }
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
      startDate: this.formatValue(new Date(this.updateTaskForm.value.startDate)),
      dueDate: this.formatValue(new Date(this.updateTaskForm.value.dueDate)),
      createdByUserId: this.updateTaskForm.value.createdBy,
      assignedToUserId: this.updateTaskForm.value.assignedTo,
      tagIds: [this.updateTaskForm.value.tags]
    };

    console.log('Task Form Value:', taskFormValue);

    this.store.dispatch(TaskActions.createTask({ task: taskFormValue }));
  }
}