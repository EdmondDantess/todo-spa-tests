const initialState = {
    windowCreateTask: false,
    tasks: {
        '1000': [
            {
                taskNumber: 1,
                title: 'some title',
                status: 'Done',
                startDate: '11/12/2022 11:02',
                endDate: '11/12/2023 12:15', description: 'add notes, buy new monitors'
            },
            {
                taskNumber: 2, title: 'some title2', status: 'Queue',
                startDate: '11/12/2022 11:02',
                endDate: '11/12/2023 12:15', description: 'add notes, buy new monitors'
            },
            {
                taskNumber: 3, title: 'some title3', status: 'Development',
                startDate: '11/12/2022 11:02',
                endDate: '11/12/2023 12:15', description: 'add notes, buy new monitors'
            },
            {
                taskNumber: 4, title: 'some title4', status: 'Queue',
                startDate: '11/12/2022 11:02',
                endDate: '11/12/2023 12:15', description: 'add notes, buy new monitors'
            },
            {
                taskNumber: 5, title: 'some title5', status: 'Queue',
                startDate: '11/12/2022 11:02',
                endDate: '11/12/2023 12:15', description: 'add notes, buy new monitors'
            }
        ] as TaskType[],
    } as TasksType,
}

export const tasksReducer = (state: InitStateType = initialState, action: TasksActionsType): InitStateType => {
    switch (action.type) {
        case 'tasks/UPDATE-TASK':
            let copyTasks = state.tasks[action.payload.projectId].map(t => t.taskNumber === action.payload.task.taskNumber ?
                {...t, ...action.payload.task} : t
            )
            return {...state, tasks: {...state.tasks, [action.payload.projectId]: copyTasks}}
        case 'tasks/CREATE-TASK':
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [action.payload.projectId]: [...state.tasks[action.payload.projectId], action.payload.task]
                }
            }
        case 'tasks/OPENCLOSE-WINDOW-CREATE-TASK':
            return {...state, windowCreateTask: action.payload.setWindow}
        default:
            return state
    }
}

export const editTask = (task: { taskNumber: number, title: string, status: TaskStatus }, projectId: string) => {
    return {
        type: 'tasks/UPDATE-TASK',
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
export const createTask = (task: TaskType, projectId: string) => {
    return {
        type: 'tasks/CREATE-TASK',
        payload: {
            task,
            projectId
        }
    } as const
}
export const openCloseCreateTask = (value: boolean) => {
    return {
        type: 'tasks/OPENCLOSE-WINDOW-CREATE-TASK',
        payload: {
            setWindow: value
        }
    } as const
}


export type TasksActionsType =
    ReturnType<typeof editTask> |
    ReturnType<typeof createTask> |
    ReturnType<typeof openCloseCreateTask>

type InitStateType = typeof initialState

export type TaskStatus = 'Queue' | 'Development' | 'Done'
export type TaskType = { taskNumber: number, title: string, description?: string, status: TaskStatus, startDate: string, endDate: string }
export type TasksType = { [key: string]: TaskType[] }
