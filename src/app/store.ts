import {projectsReducer} from '../features/projects/projects-reducer';
import {combineReducers, legacy_createStore as createStore} from 'redux';
import {TasksActionsType, tasksReducer} from '../features/tasks/tasks-reducer';
import {TaskActionsType, taskReducer} from '../features/tasks/task/task-reducer';
import {uploadFileReducer, UploadFilesActions} from '../common/components/uploadFile/uploadFile-reducer';


const rootReducer = combineReducers({
    projects: projectsReducer,
    tasks: tasksReducer,
    task: taskReducer,
    uploadFile: uploadFileReducer
})

export const store = createStore(rootReducer)

export type AppActionsType = TasksActionsType | TaskActionsType | UploadFilesActions

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store;

