import React, {useState} from 'react';
import {CommentsType, replyComment} from '../task-reducer';
import {useAppDispatch, useAppSelector} from '../../../../app/hooks';
import {TaskType} from '../../tasks-reducer';

type CommentPropsType = {
    task: TaskType
}

export const Comment: React.FC<CommentPropsType> = ({task}) => {
    const [comment, setComment] = useState<string>('')
    const [currentCommentId, setCurrentCommentId] = useState<number>(0)
    const [addComment, setAddComment] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    let comments = useAppSelector(state => state.task.comments['1000'].filter((c: CommentsType) => c.taskId === task.taskNumber))

    function addNewCommentHandler(text: string, commentId: number) {
        setCurrentCommentId(commentId)
        setAddComment(!addComment)
        if (comment.trim() !== '') {
            dispatch(replyComment(comment, commentId, '1000'))
            setComment('')
        }

    }

    function renderCommentsHandler(comments: CommentsType[]): JSX.Element[] {
        return comments.map((com, index) => {
            let tree
            if (com.subComment && com.subComment.length > 0) {
                tree = renderCommentsHandler(com.subComment)
            }
            return <div
                className={'task_comment'}
                key={Math.random()}>
                <div style={{display: 'flex'}}>

                    <button style={{width: '36px', display: 'flex', justifyContent: 'center'}}
                            onClick={() => addNewCommentHandler(com.comment, com.commentId)}>reply
                    </button>
                    {com.comment}
                    {addComment && currentCommentId === com.commentId ? <input autoFocus
                                                                               value={comment}
                                                                               style={{backgroundColor: 'whitesmoke'}}
                                                                               onChange={e => setComment(e.currentTarget.value)}/> : <></>}

                </div>
                <div style={{paddingLeft: '22px'}}>{tree}</div>
            </div>
        })
    }

    return (
        <div>
            {renderCommentsHandler(comments)}
        </div>
    );
};
