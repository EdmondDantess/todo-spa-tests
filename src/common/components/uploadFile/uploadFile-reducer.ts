const initialState = {
    '1000': {
        2: ['https://i.pinimg.com/236x/9d/fc/dc/9dfcdc098ba899f6b78b67ae2bad1929.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3gcWdx1ZhM0wkMZ0-VNFCWhdfKFp_M9xOteTjsRIHqQ&s'],
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
        default:
            return state
    }
}

export const addFile = (file: string, projectId: string, taskId: number) => {
    return {
        type: 'uploadFile/ADD-FILE',
        payload: {
            file,
            projectId,
            taskId
        }
    } as const
}

type InitStateType = typeof initialState

export type UploadFilesActions =
    ReturnType<typeof addFile>

type FilesType = {
    [key: string]: {
        [key: number]: string[]
    }
}
