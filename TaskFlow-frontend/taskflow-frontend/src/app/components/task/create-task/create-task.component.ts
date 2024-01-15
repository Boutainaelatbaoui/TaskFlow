import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  createTaskForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createTaskForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
    });
  }

  onSubmit() {
    console.log('Form submitted!', this.createTaskForm.value);
  }
}
