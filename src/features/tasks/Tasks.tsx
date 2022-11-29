import React, {useEffect, useState} from 'react';
import './tasks.css'
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {editTask, openCloseCreateTask, TaskStatus, TaskType} from './tasks-reducer';
import {DivToInput} from '../../common/components/DivToInput';
import {CreateTask} from './createTask/CreateTask';
import {Task} from './task/Task';
import {setCurrentIdTask} from './task/task-reducer';
import {useNavigate} from 'react-router-dom';
import {PATH} from '../pages/Pages';


export type BoardType = { id: number, title: TaskStatus, items: TaskType[] }

export const Tasks = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const tasks = useAppSelector(state => state.tasks.tasks)
    const projectId = useAppSelector(state => state.projects.currentProject)
    const [currentBoard, setCurrentBoard] = useState<BoardType | null>(null)
    const [currentItem, setCurrentItem] = useState<TaskType | null>(null)
    const [searchText, setSearchText] = useState<string>('')
    const [boards, setBoards] = useState<BoardType[]>([
        {id: 1, title: 'Queue', items: []},
        {id: 2, title: 'Development', items: []},
        {id: 3, title: 'Done', items: []},
    ])

    useEffect(() => {
        if (projectId !== -1 && tasks[projectId].length > 0) {
            for (let i = 0; i < boards.length; i++) {
                boards[i].items = tasks[projectId]?.filter(t => t.status === boards[i].title)
                setBoards([...boards])
            }
        }
        if (searchText.trim() !== '') {
            for (let i = 0; i < boards.length; i++) {
                boards[i].items = tasks[projectId]?.filter(t => (t.title.toLowerCase() === searchText.toLowerCase() || t.taskNumber === +searchText) && t.status === boards[i].title)
                setBoards([...boards])
            }
        }
    }, [tasks, searchText])

    function searchTaskHandler(text: string) {
        setSearchText(text)
    }

    function navigateToProjects() {
        navigate(PATH.PROJECTS)
    }

    function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()

    }

    function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
    }

    function dragStartHandler(e: React.DragEvent<HTMLDivElement>, boardDnD: BoardType, item: TaskType) {

        setCurrentBoard(boardDnD)
        setCurrentItem(item)
    }

    function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.style.boxShadow = 'none'
    }

    function dropCardHandler(e: React.DragEvent<HTMLDivElement>, boardDnD: BoardType) {
        e.preventDefault()
        boardDnD.items.push(currentItem!)
        const currentIndex = currentBoard?.items.indexOf(currentItem!)
        currentBoard?.items.splice(currentIndex!, 1)
        dispatch(editTask({
            taskNumber: currentItem!.taskNumber,
            title: currentItem!.title,
            status: boardDnD.title,
            priority: currentItem!.priority,
            description: currentItem!.description
        }, projectId))
        e.currentTarget.style.opacity = '1'
    }

    let boardDnDWithTasks = boards.map((b) => {
        if (b.items) {
            let task = b.items.map((t) => {
                const onTitleChangeHandler = (newValue: string) => {
                    dispatch(editTask({
                        taskNumber: t.taskNumber,
                        title: newValue,
                        status: t.status,
                        description: t.description,
                        priority: t.priority
                    }, projectId))
                }
                return <div key={t.taskNumber + t.title}
                            style={{background: `${t.priority === 'normal' ? 'linear-gradient(to right, rgba(0, 180, 255, 0.75), rgba(131, 202, 13, 0.71))' : 'linear-gradient(to right, rgba(170, 0, 255, 0.49), rgba(253, 0, 21, 0.63))'}`}}
                            className={'task'}>
                    <div
                        onDragStart={e => dragStartHandler(e, b, t)}
                        onDragEnd={e => dragEndHandler(e)}
                        draggable={true}
                                            ><DivToInput value={t} onChange={onTitleChangeHandler}/></div>
                    <hr/>
                    <div style={{width: '100%', marginTop: '-8px'}}>
                    <span onClick={() => dispatch(setCurrentIdTask(true, t.taskNumber))} className={'button_task'}>
                        See task👁</span>
                        <Task task={t}/>
                    </div>
                </div>
            })
            return <div className={`${b.title}`} key={b.id + b.title}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDrop={e => dropCardHandler(e, b)}
                        onDragLeave={e => dragLeaveHandler(e)}>
                <h3 className={'tasks_title'}>{b.title}</h3>
                {task}
            </div>
        }
    })

    return (
        <div className={'tasks'}>
            <div className={'buttons_onhead_table'}>
                <button onClick={navigateToProjects}>Go to projects</button>
                <button onClick={() => dispatch(openCloseCreateTask(true))}>Create task</button>
                <input type="text" style={{backgroundColor: 'slateblue'}} value={searchText} placeholder={'Search text'}
                       onChange={(e) => searchTaskHandler(e.currentTarget.value)}/>
                {searchText.trim() !== '' ? <button onClick={() => setSearchText('')}>X</button> : <></>}
            </div>
            <CreateTask/>
            <div className={'tasks_table'}>
                {boardDnDWithTasks}
            </div>
        </div>
    );
};