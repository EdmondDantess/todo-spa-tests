import React from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import './projects.css'
import {useNavigate} from 'react-router-dom';
import {PATH} from '../pages/Pages';

export const Projects = () => {
    const dispatch = useAppDispatch()
    const projects = useAppSelector(state => state.projects.projects)
    const navigate = useNavigate()

    return (
        <div className={'projects'}>
            <div className={'projects_header'}>Choose your project</div>
            <div className={'projects_list'}>
                {
                    projects.map(p => (
                        <div className={'project'} onClick={()=>navigate(PATH.TASKS)}>{p.title}</div>
                    ))
                }
            </div>
        </div>
    );
};
