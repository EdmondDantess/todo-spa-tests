import React from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import './projects.css'

export const Projects = () => {
    const dispatch = useAppDispatch()
    const projects = useAppSelector(state => state.projects.projects)

    return (
        <div className={'projects'}>
            <div className={'projects_header'}>Choose your project</div>
            <div className={'projects_list'}>
                {
                    projects.map(p => (
                        <div className={'project'}>{p.title}</div>
                    ))
                }
            </div>
        </div>
    );
};
