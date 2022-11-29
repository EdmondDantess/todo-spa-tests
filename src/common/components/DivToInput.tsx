import {ChangeEvent, useState} from 'react';
import {TaskType} from '../../features/tasks/tasks-reducer';
import './divToInput.css'

type EditableSpanPropsType = {
    value: TaskType
    onChange: (newValue: string) => void
}

export const DivToInput = (props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value.title);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value.title);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode ?
        <div className={'wrapper_input_edit_title'}>
            <div style={{fontSize: '10px'}}>Edit task title:</div>
        <div>   <input value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}
                   style={{backgroundColor: 'bisque'}}/>
            <button>✅</button></div>
        </div>
        : <div style={{position: 'relative', zIndex: 0, cursor: 'grab'}} className={'div_to_input'}>
            <span className={'task_number'}>Task №{props.value.taskNumber}</span>
            <span className={'task_informationData'}>end: {props.value.endDate.slice(0, 21)}</span>
            <span style={{cursor: 'pointer', color: 'whitesmoke'}}
                  onClick={activateEditMode}
                  title={title}
            >✎{title.trim().slice(0, 11)}</span>

            <div style={{
                position: 'absolute',
                top: 0,
                backgroundColor: `${props.value.priority === 'high' ? 'red' : ''}`,
                fontSize: '12px'
            }}>Priority: {props.value.priority} </div>
        </div>
}