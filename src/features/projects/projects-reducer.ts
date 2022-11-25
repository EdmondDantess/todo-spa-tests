type InitStateType = typeof initialState

const initialState = {

    projects: [{projectId: 1, title: 'some title'}]
}

export const projectsReducer = (state: InitStateType = initialState, action: ProjectsActionsType): InitStateType => {
    switch (action.type) {
        case 'projectsReducer/SET-datas':
            return {...state}
        default:
            return state
    }
}
export const setData = () => {
    return {
        type: 'projectsReducer/SET-datas',
        payload: {}
    }
}


export type ProjectsActionsType =
    ReturnType<typeof setData>
