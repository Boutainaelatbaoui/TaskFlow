import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTask from '../reducers/task.reducer';

export const selectTaskState = createFeatureSelector<fromTask.TaskState>('tasks');

export const selectTasks = createSelector(
    selectTaskState,
    fromTask.selectTasks
);

export const selectTags = createSelector(
    selectTaskState,
    fromTask.selectTags
);

export const selectUsers = createSelector(
    selectTaskState,
    fromTask.selectUsers
);

export const selectLoading = createSelector(
    selectTaskState,
    fromTask.selectLoading
);

export const selectError = createSelector(
    selectTaskState,
    fromTask.selectError
);

export const selectSelectedTask = createSelector(
    selectTaskState,
    fromTask.selectSelectedTask
);

export const TaskSelectors = {
    selectTaskState,
    selectTasks,
    selectTags,
    selectUsers,
    selectLoading,
    selectError,
    selectSelectedTask,
};
