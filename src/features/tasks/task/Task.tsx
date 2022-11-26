import React, {MouseEvent, useState} from 'react';
import './task.css'
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {addComment, CommentsType, setCurrentIdTask} from './task-reducer';
import {TaskType} from '../tasks-reducer';
import {Comment} from './comment/Comment';


type TaskPropsType = {
    task: TaskType
}

export const Task: React.FC<TaskPropsType> = ({task}) => {
    const [commentValue, setCommentValue] = useState<string>('')

    const dispatch = useAppDispatch()
    let tasks = useAppSelector(state => state.tasks.tasks['1000'].find(t => t.taskNumber === task.taskNumber))
    let isOpen = useAppSelector(state => state.task.isOpen)
    const description = useAppSelector(state => state.tasks.tasks['1000'].find(d => d.taskNumber === task.taskNumber)?.description || '')

    function addCommentHandler(e: MouseEvent<HTMLButtonElement>) {
        dispatch(addComment({
            parentId: Date.now(),
            comment: commentValue,
            taskId: task.taskNumber,
            commentId: Date.now(),
            subComment: []
        }, '1000', 0))
        setCommentValue('')
    }


    return (
        <>
            {isOpen.taskId === tasks?.taskNumber ?
                <div className={'task_modal_mask'}
                     style={{display: `${isOpen ? 'flex' : 'none'}`, backdropFilter: `${isOpen ? 'blur(4px)' : ''}`}}>
                    <button onClick={() => dispatch(setCurrentIdTask(false, -1))}>X</button>

                    <div className={'task_modal'}>
                        <div className={'task_left_block'}>
                            <div className={'header_task'}>
                                <div>Title: <span>{task.title}</span></div>
                                <div>Status: <span>{task.status}</span></div>
                                <div>Date of creation: <span>{task.startDate}</span></div>
                                <div>Delivery date: <span>{task.endDate}</span></div>
                            </div>
                            <div className={'task_description'}>
                                {description}
                            </div>
                        </div>
                        <div className={'task_right_block'}>
                            <div>
                                <Comment task={task}/>
                            </div>
                            <div className={'task_textarea'}>
                                <textarea value={commentValue}
                                          onChange={(e) => setCommentValue(e.currentTarget.value)}></textarea>
                                <button onClick={addCommentHandler} disabled={commentValue.trim() === ''}>Add comment
                                </button>
                            </div>
                        </div>
                    </div>
                </div> : <></>}
        </>
    );
};