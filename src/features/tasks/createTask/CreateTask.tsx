import React, {useState} from 'react';
import './create-task.css'
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {createTask, openCloseCreateTask} from '../tasks-reducer';
import {createFieldFile} from '../../../common/components/uploadFile/uploadFile-reducer';

export const CreateTask = () => {
    const dispatch = useAppDispatch()
    const value = useAppSelector(state => state.tasks.windowCreateTask)
    const tasks = useAppSelector(state => state.tasks.tasks)
    const projectId = useAppSelector(state => state.projects.currentProject)
    const [nameTask, setNameTask] = useState<string>('')
    const [desciptionTask, setDescriptionTask] = useState<string>('')
    const [endTime, setEndTime] = useState<string>('')

    let taskNumber = () => {
        if (projectId !== -1 && tasks[projectId].length > 0) {
            return tasks[projectId][tasks[projectId].length - 1].taskNumber + 1
        } else return 1
    }
    let getTaskNum = taskNumber()

    function createTaskHandler() {
        if (nameTask.trim() === '') {
            alert('Enter task title')
        } else {
            const startDate = new Date()
            const endDate = new Date(endTime)

            dispatch(createTask({
                taskNumber: getTaskNum,
                title: nameTask,
                status: 'Queue',
                startDate: `${startDate}`,
                endDate: `${endDate}`,
                description: desciptionTask,
                subTasks: [],
            }, projectId))
            dispatch(openCloseCreateTask(false))
            dispatch(createFieldFile(projectId, getTaskNum))
            setNameTask('')
            setDescriptionTask('')
            setEndTime('')
        }
    }

    return (
        <div className={'createTaskBlur'}
             style={{display: `${value ? 'flex' : 'none'} `, backdropFilter: `${value ? 'blur(4px)' : ''}`}}>
            <div className={'createTask'} style={{position: 'relative'}}>
                {
                    value ? <div className={'modal_create'}>
                            <button onClick={() => dispatch(openCloseCreateTask(false))}
                                    style={{position: 'absolute', top: '-20px'}}>
                                Close window
                            </button>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>Enter task: <input type="text"
                                                                                                               value={nameTask}
                                                                                                               onChange={e => setNameTask(e.currentTarget.value)}/>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}><span
                                style={{fontSize: '12px'}}>Enter end time(in format: 2022-02-02T11:40):</span> <input
                                type="text" value={endTime}
                                onChange={e => setEndTime(e.currentTarget.value)}/>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>Description task: <input
                                type="text" value={desciptionTask}
                                onChange={e => setDescriptionTask(e.currentTarget.value)}/></div>
                            <button onClick={createTaskHandler} style={{height: '40px'}}>Create task</button>
                        </div>
                        : <></>
                }
            </div>
        </div>
    );
};
