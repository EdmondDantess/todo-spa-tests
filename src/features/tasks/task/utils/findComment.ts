import {CommentsType} from '../task-reducer';

export function deepSearch(array: CommentsType[], commentId: number, text: string): CommentsType[] {
    let copy = [...array]
    copy.map((c: CommentsType) => {
        if (c.commentId === commentId) {
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
}
