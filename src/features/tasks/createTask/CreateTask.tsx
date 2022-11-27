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
        if (projectId !== -1 && tasks[projectId].length > 0 ) {
            return tasks[projectId][tasks[projectId].length - 1].taskNumber + 1
        } else return 1
    }
    let getTaskNum = taskNumber()

    function createTaskHandler() {
        const startDate = new Date()
        const endDate = new Date('2015-02-02T11:40')


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
