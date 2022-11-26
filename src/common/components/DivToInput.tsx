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
        ? <div style={{display: 'flex', justifyContent: 'center' ,cursor: 'pointer', margin: '3px auto', height: '27px'}}>
        <div>Edit task title:</div>
        <input value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}
                 style={{}}/> <button>✅</button> </div>
        : <div ><span>Task #{props.value.taskNumber}</span>
            {/*<br/>*/}
            {/*<span className={'task_informationData'}>start: {props.value.startDate}</span>*/}
            <br/>
            <span className={'task_informationData'}>end: {props.value.endDate}</span>
             <br/><span style={{cursor: 'pointer', backgroundColor:'gray'}} onClick={activateEditMode}>✎{title}</span> </div>
}