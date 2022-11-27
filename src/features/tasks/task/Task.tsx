import React, {MouseEvent, useState} from 'react';
import './task.css'
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {addComment, setCurrentIdTask} from './task-reducer';
import {addSubTask, doneSubTask, editTask, TaskType} from '../tasks-reducer';
import {Comment} from './comment/Comment';
import {InputTypeFile} from '../../../common/components/uploadFile/uploadFile';
import {downloadHandler} from './utils/downloadFile';


const styleForButtonDesc: any = {
    position: 'absolute',
    right: '0',
    width: '10%',
    height: '100%',
}

type TaskPropsType = {
    task: TaskType
}


export const Task: React.FC<TaskPropsType> = ({task}) => {
    const [commentValue, setCommentValue] = useState<string>('')

    const dispatch = useAppDispatch()
    const projectId = useAppSelector(state => state.projects.currentProject)
    const tasks = useAppSelector(state => state.tasks.tasks[projectId].find(t => t.taskNumber === task.taskNumber))
    const isOpen = useAppSelector(state => state.task.isOpen)
    const files = useAppSelector(state => state.uploadFile)
    const description = useAppSelector(state => state.tasks.tasks[projectId].find(d => d.taskNumber === task.taskNumber)?.description || '')
    const [descriptionValue, setDescriptionVAlue] = useState<string>(description)
    const [editDescription, setEditDescription] = useState<boolean>(false)
    const [subTask, setSubtask] = useState<string>('')


    function addSubTaskHandler() {
        if (subTask.trim() !== '') {
            dispatch(addSubTask(false, subTask, projectId, Date.now(), task.taskNumber))
            setSubtask('')
        }
    }

    function addCommentHandler(e: MouseEvent<HTMLButtonElement>) {
        dispatch(addComment({
            parentId: Date.now(),
            comment: commentValue,
            taskId: task.taskNumber,
            commentId: Date.now(),
            subComment: []
        }, projectId, 0))
        setCommentValue('')
    }

    function editDescriptionHandler() {
        dispatch(editTask({
            taskNumber: task.taskNumber,
            title: task.title,
            status: task.status,
            description: descriptionValue
        }, projectId))
        setDescriptionVAlue(description)
        setEditDescription(false)
    }


    return (
        <>
            {isOpen.taskId === tasks?.taskNumber ?
                <div className={'task_modal_mask'}
                     style={{display: `${isOpen ? 'flex' : 'none'}`, backdropFilter: `${isOpen ? 'blur(4px)' : ''}`}}>
                    <button onClick={() => dispatch(setCurrentIdTask(false, -1))}
                            style={{marginLeft: '73%', zIndex: '1'}}>Close X
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
                                {editDescription ? <div style={{position: 'relative'}}>
                                    <textarea value={descriptionValue}
                                              style={{
                                                  height: '100%',
                                                  width: '90%',
                                                  resize: 'none',
                                                  backgroundColor: `rgba(185, 182, 182, 0.57)`,
                                              }}
                                              onChange={e => setDescriptionVAlue(e.currentTarget.value)}></textarea>
                                        <button style={styleForButtonDesc} onClick={editDescriptionHandler}>Edit description
                                        </button>
                                    </div>
                                    : <div style={{position: 'relative', height: '100%'}}
                                           onDoubleClick={() => setEditDescription(true)}>
                                        <span>Description:</span> {description}
                                        <button
                                            onClick={() => setEditDescription(true)}
                                            style={styleForButtonDesc}>Edit
                                        </button>
                                    </div>
                                }
                            </div>
                            <div style={{display: 'flex'}} className={'field_pin_files'} title={'File table'}>  {
                                files[projectId][tasks.taskNumber]?.map(f => {
                                    return <div key={Math.random()} title={f.name}>
                                        file: {f.name.slice(0, 10)}...
                                        <button onClick={() => downloadHandler(f, f.type, f.name)}>download</button>
                                    </div>
                                })
                            }</div>
                            <InputTypeFile/>
                            <div className={'subTasks'}>
                                <div className={'subtasks_table'} title={'Tasks table'}>
                                    {
                                        tasks.subTasks?.map((s) => {
                                            return <div
                                                key={s.subTaskId}
                                                style={{
                                                    fontSize: '11px',
                                                    borderRight: '1px solid black',
                                                    textAlign: 'left',
                                                    height: '100%',
                                                    minWidth: '120px'
                                                }}>
                                                <button
                                                    onClick={() => dispatch(doneSubTask(!s.done, projectId, s.subTaskId, task.taskNumber))}>{s.done ? '✅' :
                                                    <span style={{
                                                        width: '9px',
                                                        height: '9px',
                                                        border: '1px solid black'
                                                    }}>__</span>}</button>
                                                {s.task}</div>
                                        })
                                    }
                                </div>
                                <div style={{display: 'flex'}}>
                                    <textarea value={subTask}
                                              style={{
                                                  height: '100%',
                                                  width: '90%',
                                                  resize: 'none',
                                                  backgroundColor: `rgba(185, 182, 182, 0.57)`,
                                              }}
                                              onChange={e => setSubtask(e.currentTarget.value)}></textarea>
                                    <button onClick={addSubTaskHandler}>Add task</button>
                                </div>
                            </div>
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