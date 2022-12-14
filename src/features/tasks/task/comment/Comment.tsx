import React, {useState} from 'react';
import {CommentsType, replyComment} from '../task-reducer';
import {useAppDispatch, useAppSelector} from '../../../../app/hooks';
import {TaskType} from '../../tasks-reducer';
import './comment.css'

type CommentPropsType = {
    task: TaskType
}

export const Comment: React.FC<CommentPropsType> = ({task}) => {
    const [comment, setComment] = useState<string>('')
    const [currentCommentId, setCurrentCommentId] = useState<number>(0)
    const [addComment, setAddComment] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const projectId = useAppSelector(state => state.projects.currentProject)
    const comments = useAppSelector(state => state.task.comments[projectId].filter((c: CommentsType) => c.taskId === task.taskNumber))

    function addNewCommentHandler(text: string, commentId: number) {
        setCurrentCommentId(commentId)
        setAddComment(!addComment)
        if (comment.trim() !== '') {
            dispatch(replyComment(comment, commentId, projectId))
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
                <div className={'block_comment'}>
                    <div style={{display: 'flex'}}>
                        <button className={'reply_button'}
                        onClick={() => addNewCommentHandler(com.comment, com.commentId)}>reply
                        </button>
                        {addComment && currentCommentId === com.commentId ?
                            <input autoFocus
                                   value={comment}
                                   style={{backgroundColor: 'bisque', zIndex: 1}}
                                   onChange={e => setComment(e.currentTarget.value)}/>
                            : <span className={'span_comment'}>???{com.comment}</span>
                        }
                    </div>
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
