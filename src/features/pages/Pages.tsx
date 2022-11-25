import {Navigate, Route, Routes} from 'react-router-dom';
import {Projects} from '../projects/Projects';
import {Tasks} from '../tasks/Tasks';
import {Page404} from '../Page404';

export enum PATH {
    PROJECTS = '/projects',
    TASKS = '/tasks',
}

export const Pages = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Navigate to={PATH.PROJECTS}/>}/>
            <Route path={PATH.PROJECTS} element={<Projects/>}/>
            <Route path={PATH.TASKS} element={<Tasks/>}/>
            <Route path={'/*'} element={<Page404/>}/>
        </Routes>
    )
}