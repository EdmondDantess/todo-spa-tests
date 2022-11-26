import {deepSearch} from './utils/findComment';

const initialState = {
    isOpen: {open: false, taskId: -1},
    comments: {
        '1000': [
            {parentId: 124, taskId: 1, commentId: 168, comment: 'фывфыв', subComment: []},
            {parentId: 1213214, taskId: 2, commentId: 681, comment: 'string', subComment: []},
            {parentId: 1213, taskId: 3, commentId: 14, comment: 'task3', subComment: []},
            {parentId: 11, taskId: 4, commentId: 164646, comment: 'string', subComment: []},
            {
                parentId: 22,
                taskId: 5,
                commentId: 1,
                comment: 'task44',
                subComment: [{
                    taskId: 5,
                    commentId: 232,
                    comment: 'its subComment',
                    subComment: [{taskId: 5, commentId: 3, comment: 'its subComment2', subComment: []}] as any
                }] as CommentsType[]
            },
        ],
    } as any
}

export const taskReducer = (state: InitStateType = initialState, action: TaskActionsType): InitStateType => {
    switch (action.type) {
        case 'task/CREATE-COMMENT':
            const copyArrComments = [...state.comments[action.payload.projectId]]
            return {
                ...state,
                comments: {...state.comments, [action.payload.projectId]: [...copyArrComments, action.payload.comment]}
            }
        case 'task/EDIT-TASK':
            return {...state, isOpen: action.payload.isOpen}
        case 'task/REPLY-TASK':
            const copyArrCommentsr = [...state.comments[action.payload.projectId]]
            deepSearch(copyArrCommentsr, action.payload.commentId, 'action.payload.text')
            return {
                ...state,
                comments: {...state.comments, [action.payload.projectId]: [...copyArrCommentsr]}
            }
        default:
            return state
    }
}
export const addComment = (comment: CommentsType, projectId: string, findId?: number) => {
    return {
        type: 'task/CREATE-COMMENT',
        payload: {
            comment,
            projectId,
            findId
        }
    } as const
}

export const setCurrentIdTask = (open: boolean, taskId: number) => {
    return {
        type: 'task/EDIT-TASK',
        payload: {
            isOpen: {
                open,
                taskId
            }
        }
    } as const
}
export const replyComment = (text: string, commentId: number, projectId: string) => {
    return {
        type: 'task/REPLY-TASK',
        payload: {
            text,
            commentId,
            projectId
        }
    } as const
}

type InitStateType = typeof initialState

export type TaskActionsType =
    ReturnType<typeof addComment> |
    ReturnType<typeof setCurrentIdTask> |
    ReturnType<typeof replyComment>

export type CommentsType = { parentId: number, taskId: number, commentId: number, comment: string, subComment: CommentsType[] }