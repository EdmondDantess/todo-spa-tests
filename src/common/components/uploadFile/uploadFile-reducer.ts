const initialState = {
    1000: {
        2: [],
        1: [],
        3: [],
        4: [],
        5: []
    }
} as FilesType

export const uploadFileReducer = (state: InitStateType = initialState, action: UploadFilesActions): InitStateType => {
    switch (action.type) {
        case 'uploadFile/ADD-FILE':
            return {
                ...state,
                [action.payload.projectId]: {
                    ...state[action.payload.projectId],
                    [action.payload.taskId]: [...state[action.payload.projectId][action.payload.taskId],
                        action.payload.file]
                }
            }
        case 'uploadFile/CREATE-FIELD':
            let dataToSet
            if (action.payload.taskId) {
                dataToSet = {[action.payload.projectId]: {}}
            } if (!!action.payload.taskId) {
                dataToSet = {
                    [action.payload.projectId]: {
                        ...state[action.payload.projectId],
                        [action.payload.taskId]: []
                    }
                }
            }
            return {...state, ...dataToSet}
        case 'uploadFile/ADD-PROJID':
            return {...state, [action.payload.projectId]: []}
        default:
            return state
    }
}

export const addFile = (file: File, projectId: number, taskId: number) => {
    return {
        type: 'uploadFile/ADD-FILE',
        payload: {
            file,
            projectId,
            taskId
        }
    } as const
}

export const createFieldFile = (projectId: number, taskId?: number) => {
    return {
        type: 'uploadFile/CREATE-FIELD',
        payload: {
            projectId,
            taskId
        }
    } as const
}
export const addNewProjId = (projectId: number) => {
    return {
        type: 'uploadFile/ADD-PROJID',
        payload: {
            projectId,
        }
    } as const
}

type InitStateType = typeof initialState

export type UploadFilesActions =
    ReturnType<typeof addFile> |
    ReturnType<typeof addNewProjId> |
    ReturnType<typeof createFieldFile>

type FilesType = {
    [key: string]: {
        [key: number]: File[]
    }
}
