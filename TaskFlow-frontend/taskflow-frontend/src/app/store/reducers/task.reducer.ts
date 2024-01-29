import { createReducer, on } from '@ngrx/store';
import * as TaskActions from '../actions/task.actions';
import { Task } from 'src/app/models/task';
import { Tag } from 'src/app/models/tag';
import { User } from 'src/app/models/user';

export interface TaskState {
    tasks: Task[];
    tags: Tag[];
    users: User[];
    loading: boolean;
    error: any;
    selectedTask: Task | null;
}

export const initialState: TaskState = {
    tasks: [],
    tags: [],
    users: [],
    loading: false,
    error: null,
    selectedTask: null,
};

export const taskReducer = createReducer(
    initialState,
    on(TaskActions.loadTasks, state => ({ ...state, loading: true, error: null })),
    on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({ ...state, tasks, loading: false })),
    on(TaskActions.loadTasksFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(TaskActions.loadTags, state => ({ ...state, loading: true, error: null })),
    on(TaskActions.loadTagsSuccess, (state, { tags }) => ({ ...state, tags, loading: false })),
    on(TaskActions.loadTagsFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(TaskActions.loadUsers, state => ({ ...state, loading: true, error: null })),
    on(TaskActions.loadUsersSuccess, (state, { users }) => ({ ...state, users, loading: false })),
    on(TaskActions.loadUsersFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(TaskActions.createTask, state => ({ ...state, loading: true, error: null })),
    on(TaskActions.createTaskSuccess, (state, { task }) => ({
        ...state,
        tasks: [...state.tasks, task],
        loading: false,
    })),
    on(TaskActions.createTaskFailure, (state, { error }) => ({ ...state, error, loading: false })),
    on(TaskActions.loadTaskSuccess, (state, { task }) => ({ ...state, selectedTask: task, loading: false })),
    on(TaskActions.loadTaskFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(TaskActions.updateTaskSuccess, (state, { task }) => {
        const updatedTasks = state.tasks.map((t) => (t.id === task.id ? task : t));
        return { ...state, tasks: updatedTasks, loading: false };
    }),
    on(TaskActions.updateTaskFailure, (state, { error }) => ({ ...state, error, loading: false })),
);

export const selectTasks = (state: TaskState) => state.tasks;
export const selectTags = (state: TaskState) => state.tags;
export const selectUsers = (state: TaskState) => state.users;
export const selectLoading = (state: TaskState) => state.loading;
export const selectError = (state: TaskState) => state.error;
export const selectSelectedTask = (state: TaskState) => state.selectedTask;
