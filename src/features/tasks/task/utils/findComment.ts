import {CommentsType} from '../task-reducer';
import {log} from 'util';

export function deepSearch(array: CommentsType[], commentId: number, text: string): any {
    let copy = [...array]
    //  debugger
    // for (let i = 0; i < array.length; i++) {
    copy.map((c: CommentsType) => {
        if (c.commentId === commentId) {
            console.log(commentId)
            console.log(c.subComment)
            return c.subComment = [...c.subComment, {
                parentId: c.parentId,
                taskId: c.taskId,
                commentId: Date.now(),
                comment: text,
                subComment: []
            }]
        } else {
            return deepSearch(c.subComment, commentId, text)
        }

    })

    return copy
    // }
}

//{ parentId: number, taskId: number, commentId: number, comment: string, subComment: CommentsType[] }