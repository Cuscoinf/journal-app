import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUpLoading } from '../../actions/notes';

export const NotesAppBar = () => {
    const dispatch = useDispatch();
    const {active} = useSelector(state => state.notes);
    const handleSave = () => {
        dispatch(startSaveNote(active))
    }

    const handlePictureClick = () => {

        document.querySelector('#fileSelector').click();

    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file){
            dispatch(startUpLoading(file));
        }
    }

    return (
        <div className="notes__appbar">
            <span>11 de agosto 2021</span>
            <input 
            id="fileSelector"
            type="file"
            style={{display:'none'}}
            onChange={handleFileChange}
            name="file"
            />
            <div>
                <button className="btn"
                    onClick={handlePictureClick}>
                    Picture
                </button>
                <button className="btn" onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    )
}
