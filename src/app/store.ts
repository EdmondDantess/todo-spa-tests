import {ProjectsActionsType, projectsReducer} from '../features/projects/projects-reducer';
import {combineReducers, legacy_createStore as createStore} from 'redux';
import {TasksActionsType, tasksReducer} from '../features/tasks/tasks-reducer';
import {TaskActionsType, taskReducer} from '../features/tasks/task/task-reducer';
import {uploadFileReducer, UploadFilesActions} from '../common/components/uploadFile/uploadFile-reducer';
import {loadState, saveState} from './localstorage-utils';


const rootReducer = combineReducers({
    projects: projectsReducer,
    tasks: tasksReducer,
    task: taskReducer,
    uploadFile: uploadFileReducer
})

export const store = createStore(rootReducer, loadState())

store.subscribe(()=>{
    saveState({
        projects: store.getState().projects,
        tasks: store.getState().tasks,
        task: store.getState().task,
        uploadFile: store.getState().uploadFile
    })
})

export type AppActionsType = TasksActionsType | TaskActionsType | UploadFilesActions | ProjectsActionsType

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store;

