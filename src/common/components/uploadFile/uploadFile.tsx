import React, {ChangeEvent, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {addFile} from './uploadFile-reducer';
import './uploadFile.css'

export const InputTypeFile = () => {
    const dispatch = useAppDispatch()
    let taskId = useAppSelector(state => state.task.isOpen.taskId)

    const inputRef = useRef<HTMLInputElement>(null)

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 100000) {
                dispatch(addFile(file, '1000', taskId))
                console.log('file: ', file)
            } else {
                alert('File size is large! Choose files with size < 100kb ')
            }
        }
    };


    return (
        <div className={'block_custom_fileload'}>
            <label>
                <input type="file"
                       onChange={uploadHandler}
                       style={{width: '0'}}
                       ref={inputRef}
                />
                <div className={'custom_pin_button'}>Pin your file📎</div>
            </label>
            <div style={{fontSize: '9px', color: 'black'}}>Upload files with size less 100kb</div>

        </div>
    )
}
