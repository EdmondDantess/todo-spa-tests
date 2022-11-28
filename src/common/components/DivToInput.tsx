import {ChangeEvent, useState} from 'react';
import {TaskType} from '../../features/tasks/tasks-reducer';

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

    return editMode
        ?
        <div style={{display: 'flex', justifyContent: 'center', cursor: 'pointer', margin: '3px auto', height: '27px'}}>
            <div style={{fontSize: '10px'}}>Edit task title:</div>
            <input value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}
                   style={{backgroundColor: 'bisque'}}/>
            <button>✅</button>
        </div>
        : <div style={{position: 'relative', zIndex: 0, cursor: 'grab'}}><span>Task №{props.value.taskNumber}</span>
            <br/>
            <span className={'task_informationData'}>end: {props.value.endDate.slice(0, 21)}</span>
            <br/><span style={{cursor: 'pointer'}}
                       onClick={activateEditMode}>✎{title.trim() === '' ? 'no title' : title}</span>

            <div style={{
                position: 'absolute',
                top: 0,
                backgroundColor: `${props.value.priority === 'high' ? 'red' : ''}`,
                fontSize: '12px'
            }}>Priority: {props.value.priority} </div>
        </div>
}