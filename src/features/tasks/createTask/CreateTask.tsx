import React, {useState} from 'react';
import './create-task.css'
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {createTask, openCloseCreateTask} from '../tasks-reducer';

export const CreateTask = () => {
    const dispatch = useAppDispatch()
    let value = useAppSelector(state => state.tasks.windowCreateTask)
    let tasks = useAppSelector(state => state.tasks.tasks)
    const [nameTask, setNameTask] = useState<string>('')
    const [desciptionTask, setDescriptionTask] = useState<string>('')
    const [endTime, setEndTime] = useState<string>('')

    function createTaskHandler() {
        const startDate = new Date()
        const endDate = new Date('2015-02-02T11:40')
        const taskNumber = tasks['1000'][tasks['1000'].length - 1].taskNumber + 1
        dispatch(createTask({
            taskNumber,
            title: nameTask,
            status: 'Queue',
            startDate: `${startDate}`,
            endDate: `${endDate}`,
            description: desciptionTask,
        }, '1000'))
        dispatch(openCloseCreateTask(false))
        setNameTask('')
        setDescriptionTask('')
    }

    return (
        <div className={'createTaskBlur'}
             style={{display: `${value ? 'flex' : 'none'} `, backdropFilter: `${value ? 'blur(4px)' : ''}`}}>
            <div className={'createTask'}>
                {
                    value ? <div className={'modal'}>
                            <button onClick={() => dispatch(openCloseCreateTask(false))} style={{margin: 'auto'}}>
                                Close window
                            </button>
                            <div>Enter task: <input type="text" value={nameTask}
                                                    onChange={e => setNameTask(e.currentTarget.value)}/></div>
                            <div>Enter end time(in format: 2015-02-02T11:40): <input type="text" value={endTime}
                                                                                     onChange={e => setEndTime(e.currentTarget.value)}/>
                            </div>
                            <div>Description task: <input type="text" value={desciptionTask}
                                                          onChange={e => setDescriptionTask(e.currentTarget.value)}/></div>
                            <button onClick={createTaskHandler}>Create task</button>
                        </div>
                        : <></>
                }
            </div>
        </div>
    );
};
