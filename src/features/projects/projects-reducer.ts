import {AppActionsType} from '../../app/store';

type InitStateType = typeof initialState

const initialState = {
    currentProject: -1,
    projects: [{projectId: 1000, title: 'Project first'} as any]
}

export const projectsReducer = (state: InitStateType = initialState, action: AppActionsType): InitStateType => {
    switch (action.type) {
        case 'projectsReducer/CREATE-PROJECT':
            return {...state, projects: [...state.projects, action.payload]}
        case 'projectsReducer/SET-PROJID':
            return {...state, currentProject: action.payload.projectId}
        case 'projectsReducer/DEL-PROJID':
            return {...state, projects: state.projects.filter(p=> p.projectId !== action.payload.projectId)}
        default:
            return state
    }
}

export const createProject = (title: string, projectId: number) => {
    return {
        type: 'projectsReducer/CREATE-PROJECT',
        payload: {
            title,
            projectId
        }
    }
}
export const setCurrentProjId = (projectId: number) => {
    return {
        type: 'projectsReducer/SET-PROJID',
        payload: {
            projectId
        }
    }
}
export const deleteProject = (projectId: number) => {
    return {
        type: 'projectsReducer/DEL-PROJID',
        payload: {
            projectId
        }
    }
}


export type ProjectsActionsType =
    ReturnType<typeof createProject> |
    ReturnType<typeof deleteProject> |
    ReturnType<typeof setCurrentProjId>
