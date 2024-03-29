import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TaskComponent } from './components/task/task.component';
import { taskReducer } from './store/reducers/task.reducer';
import { TaskEffects } from './store/effects/task.effects';
import { CreateTaskComponent } from './components/task/create-task/create-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateTaskComponent } from './components/task/update-task/update-task.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    TaskComponent,
    CreateTaskComponent,
    UpdateTaskComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule, 
    StoreModule.forRoot({ tasks: taskReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: false }),
    EffectsModule.forRoot([TaskEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
