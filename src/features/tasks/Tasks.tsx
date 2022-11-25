import React, {useEffect, useState} from 'react';
import './tasks.css'
import {useAppSelector} from '../../app/hooks';
import {editTask, TaskStatus, TaskType} from './tasks-reducer';
import {DivToInput} from '../../common/components/DivToInput';
import {useDispatch} from 'react-redux';


export type BoardType = { id: number, title: TaskStatus, items: TaskType[] }

export const Tasks = () => {
    const dispatch = useDispatch()
    const tasks = useAppSelector(state => state.tasks.tasks)
    // const boardFromState = useAppSelector(state => state.tasks.boards)
    const [currentBoard, setCurrentBoard] = useState<any>(null)
    const [currentItem, setCurrentItem] = useState<any>(null)
    const [boards, setBoards] = useState<BoardType[]>([
        {id: 1, title: 'Queue', items: []},
        {id: 2, title: 'Development', items: []},
        {id: 3, title: 'Done', items: []},
    ])

    useEffect(() => {
        for (let i = 0; i < boards.length; i++) {
            boards[i].items = tasks['1000'].filter(t => t.status === boards[i].title)
            setBoards([...boards])
        }
        console.log('useeffect')
    }, [tasks])


    function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        if (e.currentTarget.className === 'task') {
            e.currentTarget.style.boxShadow = '0 4px 3px gray'

        }
    }

    function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.style.boxShadow = 'none'
    }

    function dragStartHandler(e: React.DragEvent<HTMLDivElement>, boardDnD: BoardType, item: any) {
        e.stopPropagation()
        setCurrentBoard(boardDnD)
        setCurrentItem(item)
    }

    function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.style.boxShadow = 'none'
    }

    function dropHandler(e: React.DragEvent<HTMLDivElement>, boardDnD: BoardType, item: any) {
        e.preventDefault()
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        const dropIndex = boardDnD.items.indexOf(item)
        boardDnD.items.splice(dropIndex + 1, 0, currentItem)
        dispatch(editTask({
            taskNumber: currentItem.taskNumber,
            title: currentItem.title,
            status: boardDnD.title
        }, '1000'))
        setBoards(boards.map(b => {
            if (b.id === boardDnD.id) {
                return boardDnD
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))

    }

    function dropCardHandler(e: React.DragEvent<HTMLDivElement>, boardDnD: BoardType) {
        e.preventDefault()
        boardDnD.items.push(currentItem)
       const currentIndex = currentBoard.items.indexOf(currentItem)
       currentBoard.items.splice(currentIndex, 1)
        setBoards(boards.map(b => {
            if (b.id === boardDnD.id) {
                return boardDnD
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
        dispatch(editTask({
            taskNumber: currentItem.taskNumber,
            title: currentItem.title,
            status: boardDnD.title
        }, '1000'))
    }

    let boardDnDWithTasks = boards.map((b, index) => {
        let task = b.items.map((task: TaskType, i) => {
            const onTitleChangeHandler = (newValue: string) => {
                dispatch(editTask({
                    taskNumber: task.taskNumber,
                    title: newValue,
                    status: task.status
                }, '1000'))
            }
            return <div className={'task'} key={i}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDragLeave={e => dragLeaveHandler(e)}
                        onDragStart={e => dragStartHandler(e, b, task)}
                        onDragEnd={e => dragEndHandler(e)}
                        onDrop={e => dropHandler(e, b, task)}
                        draggable={true}>
                <DivToInput value={task.title} onChange={onTitleChangeHandler}/>
            </div>
        })
        return <div className={`${b.title}`} key={index}
                    onDragOver={(e) => dragOverHandler(e)}
                  onDrop={e => dropCardHandler(e, b)}
        >
            <h3>{b.title}</h3>
            {task}
        </div>

    })

    return (
        <div className={'tasks'}>
            <div className={'tasks_table'}>
                {boardDnDWithTasks}
            </div>
        </div>
    );
};