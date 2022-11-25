const initialState = {

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
        case 'tasks/SET-NEW-TITLE':
            console.log ( action.payload.task.title)
            let copyTasks = state.tasks[action.payload.projectId].map(t => t.taskNumber === action.payload.task.taskNumber ?
                {...t, ...action.payload.task, title: action.payload.task.title} : t
            )
            console.log ( copyTasks)
            return {...state, tasks: {...state.tasks, [action.payload.projectId]: copyTasks}}
        default:
            return state
    }
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
export type TasksActionsType =
    ReturnType<typeof editTask>

type InitStateType = typeof initialState

export type TaskStatus = 'Queue' | 'Development' | 'Done'
export type TaskType = { taskNumber: number, title: string, status: TaskStatus }
export type TasksType = { [key: string]: TaskType[] }
