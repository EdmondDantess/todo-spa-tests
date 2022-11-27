import React, {ChangeEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {addFile} from './uploadFile-reducer';

export const InputTypeFile = () => {
    const dispatch = useAppDispatch()
    let taskId = useAppSelector(state => state.task.isOpen.taskId)

    const [ava, setAva] = useState<any>('null')
    const [isAvaBroken, setIsAvaBroken] = useState(false)

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    setAva(file64)
                    dispatch(addFile(file64, '1000', taskId))
                })
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
            }
        }
    }

    const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const file64 = reader.result as string
            callBack(file64)
        }
        reader.readAsDataURL(file)
    }

    const errorHandler = () => {
        setIsAvaBroken(true)
        alert('Кривая картинка')
    }

    return (
        <div>

            <label>
                <input type="file"
                       onChange={uploadHandler}
                       style={{width: '0'}}
                />
          <button>Pin your file📎</button>
            </label>
        </div>
    )
}
