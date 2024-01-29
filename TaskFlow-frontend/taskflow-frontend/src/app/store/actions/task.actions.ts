import { createAction, props } from '@ngrx/store';
import { Task } from 'src/app/models/task';
import { Tag } from 'src/app/models/tag';
import { User } from 'src/app/models/user';
import { TaskRequest } from 'src/app/models/task-request';

export const loadTasks = createAction('[Task] Load Tasks');
export const loadTasksSuccess = createAction('[Task] Load Tasks Success', props<{ tasks: Task[] }>());
export const loadTasksFailure = createAction('[Task] Load Tasks Failure', props<{ error: any }>());

export const loadTags = createAction('[Task] Load Tags');
export const loadTagsSuccess = createAction('[Task] Load Tags Success', props<{ tags: Tag[] }>());
export const loadTagsFailure = createAction('[Task] Load Tags Failure', props<{ error: any }>());

export const loadUsers = createAction('[Task] Load Users');
export const loadUsersSuccess = createAction('[Task] Load Users Success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[Task] Load Users Failure', props<{ error: any }>());

export const createTask = createAction('[Task] Create Task', props<{ task: TaskRequest }>());
export const createTaskSuccess = createAction('[Task] Create Task Success', props<{ task: Task }>());
export const createTaskFailure = createAction('[Task] Create Task Failure', props<{ error: any }>());

export const loadTask = createAction('[Task] Load Task', props<{ taskId: number }>());
export const loadTaskSuccess = createAction('[Task] Load Task Success', props<{ task: Task }>());
export const loadTaskFailure = createAction('[Task] Load Task Failure', props<{ error: any }>());

export const updateTask = createAction(
    '[Task] Update Task',
    props<{ taskId: number; userId: number; task: any }>()
);

export const updateTaskSuccess = createAction(
    '[Task] Update Task Success',
    props<{ task: Task }>()
);

export const updateTaskFailure = createAction(
    '[Task] Update Task Failure',
    props<{ error: any }>()
);

export const deleteTask = createAction(
    '[Task] Delete Task',
    props<{ taskId: number; userId: number }>()
);

export const deleteTaskSuccess = createAction(
    '[Task] Delete Task Success',
    props<{ taskId: number }>()
);

export const deleteTaskFailure = createAction(
    '[Task] Delete Task Failure',
    props<{ error: any }>()
);