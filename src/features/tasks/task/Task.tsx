import React, {MouseEvent, useState} from 'react';
import './task.css'
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {addComment, setCurrentIdTask} from './task-reducer';
import {TaskType} from '../tasks-reducer';
import {Comment} from './comment/Comment';
import {InputTypeFile} from '../../../common/components/uploadFile/uploadFile';
import {downloadHandler} from './utils/downloadFile';


type TaskPropsType = {
    task: TaskType
}

export const Task: React.FC<TaskPropsType> = ({task}) => {
    const [commentValue, setCommentValue] = useState<string>('')

    const dispatch = useAppDispatch()
    const tasks = useAppSelector(state => state.tasks.tasks['1000'].find(t => t.taskNumber === task.taskNumber))
    const isOpen = useAppSelector(state => state.task.isOpen)
    const files = useAppSelector(state => state.uploadFile)
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
                    <button onClick={() => dispatch(setCurrentIdTask(false, -1))} style={{marginLeft: '73%'}}>Close X
                    </button>
                    <div className={'task_modal'}>
                        <div className={'task_left_block'}>
                            <div className={'header_task'}>
                                <div>Title: <span>{task.title}</span></div>
                                <div>Status: <span>{task.status}</span></div>
                                <div>Date of creation: <span>{task.startDate}</span></div>
                                <div>Delivery date: <span>{task.endDate}</span></div>
                            </div>
                            <div className={'task_description'}>
                                <span>Description:</span> {description}
                            </div>
                            <div style={{display: 'flex'}} className={'field_pin_files'}>  {
                                files['1000'][tasks.taskNumber]?.map(f => {
                                    return <div key={Math.random()} title={f.name}>
                                        file: {f.name.slice(0, 10)}...
                                        <button onClick={() => downloadHandler(f, f.type, f.name)}>download</button>
                                    </div>
                                })
                            }</div>
                            <InputTypeFile/>
                        </div>

                        <div className={'task_right_block'}>
                            <div className={'comments_board'}>
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