const initialState = {
    boards: [
        {id: 1, title: 'Queue', items: []},
        {id: 2, title: 'Development', items: []},
        {id: 3, title: 'Done', items: []},
    ] as BoardType[],
    tasks: {
        '1000': [
            {taskNumber: 1, title: 'some title', status: 'Done'},
            {taskNumber: 2, title: 'some title2', status: 'Queue'},
            {taskNumber: 3, title: 'some title3', status: 'Development'},
            {taskNumber: 4, title: 'some title4', status: 'Queue'},
            {taskNumber: 5, title: 'some title5', status: 'Queue'}
        ] as TaskType[],
    } as TasksType,
}

export const tasksReducer = (state: InitStateType = initialState, action: TasksActionsType): InitStateType => {
    switch (action.type) {
        case 'tasks/SET-TASKS-IN-BOARDS':
            let copyBoards = [...state.boards]
            for (let i = 0; i < state.boards.length; i++) {
                copyBoards[i].items = action.payload.tasks[action.payload.projectId].filter((t: TaskType) => t.status === copyBoards[i].title)
            }
            return {...state, boards: copyBoards}
        case 'tasks/SET-NEW-TITLE':
            let copyTasks = state.tasks[action.payload.projectId].map(t => t.title === action.payload.task.title ?
                {...t, ...action.payload.task} : t
            )

            return {...state, tasks: {...state.tasks, [action.payload.projectId]: copyTasks}}
        case 'tasks/SET-NEW-BOARD':
            return {...state, boards: action.payload.board}
        default:
            return state
    }
}

export const setTasksInBoards = (tasks: TasksType, projectId: string) => {
    return {
        type: 'tasks/SET-TASKS-IN-BOARDS',
        payload: {
            projectId,
            tasks
        }
    } as const
}
export const editTask = (task: { taskNumber: number, title: string, status: TaskStatus }, projectId: string) => {
    return {
        type: 'tasks/SET-NEW-TITLE',
        payload: {
            task: {
                taskNumber: task.taskNumber,
                title: task.title,
                status: task.status
            },
            projectId
        }
    } as const
}
export const setNewBoard = (board: BoardType[]) => {
    return {
        type: 'tasks/SET-NEW-BOARD',
        payload: {
            board
                }
    } as const
}

export type TasksActionsType =
    ReturnType<typeof setTasksInBoards> |
    ReturnType<typeof editTask> |
    ReturnType<typeof setNewBoard>

type InitStateType = typeof initialState

type TaskStatus = 'Queue' | 'Development' | 'Done'
export type TaskType = { taskNumber: number, title: string, status: TaskStatus }
export type TasksType = { [key: string]: TaskType[] }
export type BoardType = { id: number, title: TaskStatus, items: TaskType[] }