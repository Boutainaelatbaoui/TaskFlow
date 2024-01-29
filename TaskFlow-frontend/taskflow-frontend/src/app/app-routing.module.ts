import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { TaskComponent } from './components/task/task.component';
import { CreateTaskComponent } from './components/task/create-task/create-task.component';
import { UpdateTaskComponent } from './components/task/update-task/update-task.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'tasks', component: TaskComponent },
  { path: 'create-task', component: CreateTaskComponent },
  { path: 'update-task/:taskId', component: UpdateTaskComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
