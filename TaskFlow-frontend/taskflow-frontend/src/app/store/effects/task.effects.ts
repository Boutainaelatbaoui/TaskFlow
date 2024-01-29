import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as TaskActions from '../actions/task.actions';
import { TaskService } from 'src/app/services/taskService/task.service';

@Injectable()
export class TaskEffects {
    constructor(private actions$: Actions, private taskService: TaskService) {}

    loadTasks$ = createEffect(() => this.actions$.pipe(
        ofType(TaskActions.loadTasks),
        mergeMap(() => this.taskService.getAllTasks()
            .pipe(
                map(tasks => TaskActions.loadTasksSuccess({ tasks })),
                catchError(error => of(TaskActions.loadTasksFailure({ error })))
            )
        )
    ));

    loadTags$ = createEffect(() => this.actions$.pipe(
        ofType(TaskActions.loadTags),
        mergeMap(() => this.taskService.getAllTags()
            .pipe(
                map(tags => TaskActions.loadTagsSuccess({ tags })),
                catchError(error => of(TaskActions.loadTagsFailure({ error })))
            )
        )
    ));

    loadUsers$ = createEffect(() => this.actions$.pipe(
        ofType(TaskActions.loadUsers),
        mergeMap(() => this.taskService.getAllUsers()
            .pipe(
                map(users => TaskActions.loadUsersSuccess({ users })),
                catchError(error => of(TaskActions.loadUsersFailure({ error })))
            )
        )
    ));

    createTask$ = createEffect(() => this.actions$.pipe(
        ofType(TaskActions.createTask),
        mergeMap(action => this.taskService.createTask(action.task)
            .pipe(
                map(createdTask => TaskActions.createTaskSuccess({ task: createdTask })),
                catchError(error => of(TaskActions.createTaskFailure({ error })))
            )
        )
    ));

    loadTask$ = createEffect(() => this.actions$.pipe(
        ofType(TaskActions.loadTask),
        mergeMap(({ taskId }) => this.taskService.getTaskById(taskId)
            .pipe(
                map(task => TaskActions.loadTaskSuccess({ task })),
                catchError(error => of(TaskActions.loadTaskFailure({ error })))
            )
        )
    ));

    updateTask$ = createEffect(() =>
    this.actions$.pipe(
        ofType(TaskActions.updateTask),
        mergeMap((action) =>
        this.taskService.updateTask(action.taskId, action.userId, action.task).pipe(
            map((updatedTask) => TaskActions.updateTaskSuccess({ task: updatedTask })),
            catchError((error) => of(TaskActions.updateTaskFailure({ error })))
        )
        )
    )
    );
}