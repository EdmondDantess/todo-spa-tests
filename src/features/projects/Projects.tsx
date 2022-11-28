import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import './projects.css'
import {useNavigate} from 'react-router-dom';
import {PATH} from '../pages/Pages';
import {createProject, deleteProject, setCurrentProjId} from './projects-reducer';
import {addProjId} from '../tasks/tasks-reducer';
import {addNewProjId} from '../../common/components/uploadFile/uploadFile-reducer';
import {addNewProjID} from '../tasks/task/task-reducer';

export const Projects = () => {
    const dispatch = useAppDispatch()
    const projects = useAppSelector(state => state.projects.projects)
    const tasks = useAppSelector(state => state.tasks.tasks)
    const navigate = useNavigate()
    const [creatingProj, setCreatingProj] = useState<boolean>(false)
    const [textValue, setTextValue] = useState<string>('')

    function addNewProject() {
        const projId = Date.now()
        if (textValue.trim() !== '') {
            dispatch(addProjId(projId))
            dispatch(addNewProjId(projId))
            dispatch(addNewProjID(projId))
            dispatch(createProject(textValue, projId))
            setCreatingProj(false)
            setTextValue('')
        }
    }

    function routeToProj(projectId: number) {
        dispatch(setCurrentProjId(projectId))
        navigate(PATH.TASKS)
    }

    return (
        <div className={'projects'}>
            <div className={'projects_header'}>Choose your project</div>
            {
                creatingProj ?
                    <div className={'create_input_wrapper_proj'}>
                        <input className={'create_proj_input'}
                               type="text" value={textValue}
                               onChange={e => setTextValue(e.currentTarget.value)}
                               autoFocus/>
                        <button onClick={addNewProject}>add</button>
                        <button onClick={() => setCreatingProj(false)}>X</button>
                    </div> : <></>
            }
            <button onClick={() => setCreatingProj(true)} className={'button_create_project'}>Create project</button>
            <div className={'projects_list'}>
                {
                    projects.map(p => (
                        <div key={Math.random()} className={'project'}>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <span onClick={() => routeToProj(p.projectId)}
                                      style={{cursor: 'pointer'}}
                                      className={'project_title'}
                                      title={p.title}
                                >{p.title.slice(0, 10)}</span>
                                <div style={{color: 'black'}}>Tasks: {tasks[p.projectId].length}</div>
                                <button style={{height: '20px'}} onClick={() =>
                                    dispatch(deleteProject(p.projectId))
                                }>X
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};
