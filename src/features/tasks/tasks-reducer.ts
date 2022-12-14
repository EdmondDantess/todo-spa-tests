const initialState = {
    windowCreateTask: false,
    tasks: {
        1000: [
            {
                taskNumber: 1,
                priority: 'high',
                title: 'some title',
                status: 'Done',
                startDate: '11/12/2022 11:02',
                endDate: '11/12/2023 12:15', description: 'add notes, buy new monitors',
                subTasks: [{subTaskId: 224114, done: false, task: 'sub task #1'}, {
                    subTaskId: 212134,
                    done: false,
                    task: 'sub task #1'
                }]
            },
            {
                taskNumber: 2,
                priority: 'normal',
                title: 'some title2', status: 'Queue',
                startDate: '11/12/2022 11:02',
                endDate: '11/12/2023 12:15', description: 'add notes, buy new monitors',
                subTasks: [{subTaskId: 24214, done: false, task: 'sub task #1'}, {
                    subTaskId: 212414,
                    done: false,
                    task: 'sub task #1'
                }]

            },
            {
                taskNumber: 3,
                priority: 'normal',
                title: 'some title3', status: 'Development',
                startDate: '11/12/2022 11:02',
                endDate: '11/12/2023 12:15', description: 'add notes, buy new monitors',
                subTasks: [{subTaskId: 221414, done: true, task: 'sub task #1'}, {
                    subTaskId: 244,
                    done: false,
                    task: 'sub task #1'
                }]
            },
            {
                taskNumber: 4,
                priority: 'normal',
                title: 'some title4', status: 'Queue',
                startDate: '11/12/2022 11:02',
                endDate: '11/12/2023 12:15', description: 'add notes, buy new monitors',
                subTasks: [{subTaskId: 214214, done: false, task: 'sub task #1'}, {
                    subTaskId: 214421,
                    done: false,
                    task: 'sub task #1'
                }]
            },
            {
                taskNumber: 5,
                priority: 'normal',
                title: 'some title5', status: 'Queue',
                startDate: '11/12/2022 11:02',
                endDate: '11/12/2023 12:15', description: 'add notes, buy new monitors',
                subTasks: [{subTaskId: 212144, done: false, task: 'sub task #1'}, {
                    subTaskId: 21421,
                    done: false,
                    task: 'sub task #1'
                }]
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
        case 'tasks/ADD-PROJID':
            return {...state, tasks: {...state.tasks, [action.payload.projectId]: []}}
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
        case 'tasks/CREATE-SUBTASK':
            return {
                ...state, tasks: {
                    ...state.tasks,
                    [action.payload.projectId]: state.tasks[action.payload.projectId].map(t => t.taskNumber === action.payload.taskId ? {
                        ...t, subTasks: t.subTasks = [...t.subTasks, action.payload.subTask]
                    } : t)
                }
            }
        case 'tasks/DONE-SUBTASK':
            return {
                ...state, tasks: {
                    ...state.tasks,
                    [action.payload.projectId]: state.tasks[action.payload.projectId].map(t => t.taskNumber === action.payload.taskId ? {
                        ...t,
                        subTasks: t.subTasks.map(s => s.subTaskId === action.payload.subTaskId ? {
                            ...s,
                            done: action.payload.done
                        } : s)
                    } : t)
                }
            }
        default:
            return state
    }
}
export const editTask = (task: { taskNumber: number, title: string, status: TaskStatus, description?: string, priority?: string }, projectId: number) => {
    return {
        type: 'tasks/UPDATE-TASK',
        payload: {
            task: {
                taskNumber: task.taskNumber,
                title: task.title,
                status: task.status,
                description: task.description,
                priority: task.priority || 'normal'
            },
            projectId
        }
    } as const
}
export const addProjId = (projectId: number) => {
    return {
        type: 'tasks/ADD-PROJID',
        payload: {
            projectId
        }
    } as const
}
export const createTask = (task: TaskType, projectId: number) => {
    return {
        type: 'tasks/CREATE-TASK',
        payload: {
            task:
                {...task, priority: 'normal'},
            projectId,
        }
    } as const
}
export const addSubTask = (done: boolean, text: string, projectId: number, subTaskId: number, taskId: number) => {
    return {
        type: 'tasks/CREATE-SUBTASK',
        payload: {
            subTask: {
                done,
                task: text,
                subTaskId
            },
            projectId,
            taskId
        }
    } as const
}
export const doneSubTask = (done: boolean, projectId: number, subTaskId: number, taskId: number) => {
    return {
        type: 'tasks/DONE-SUBTASK',
        payload: {
            done,
            projectId,
            taskId,
            subTaskId
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
    ReturnType<typeof addSubTask> |
    ReturnType<typeof doneSubTask> |
    ReturnType<typeof addProjId> |
    ReturnType<typeof openCloseCreateTask>


type InitStateType = typeof initialState

export type TaskStatus = 'Queue' | 'Development' | 'Done'
export type SubTasks = { done: boolean, task: string, subTaskId: number }
export type TaskType = { taskNumber: number, title: string, description?: string, status: TaskStatus, startDate: string, endDate: string, priority?: string, subTasks: SubTasks[] }
export type TasksType = { [key: string]: TaskType[] }
