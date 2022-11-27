import {RootState} from './store';

export const loadState = () => {
    const serializedState = localStorage.getItem('app-state')
    if (serializedState === null) {
        return undefined
    }
    return JSON.parse(serializedState)
}

export const saveState = (state: RootState) => {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('app-state', serializedState)
}