import {projectsReducer} from '../features/projects/projects-reducer';
import {combineReducers, legacy_createStore as createStore} from 'redux';
import {TasksActionsType, tasksReducer} from '../features/tasks/tasks-reducer';


const rootReducer = combineReducers({
    projects: projectsReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer)

export type AppActionsType = TasksActionsType

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store;

