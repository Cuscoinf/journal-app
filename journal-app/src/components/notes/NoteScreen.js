import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NotesAppBar } from './NotesAppBar'
import { useForm } from '../../hooks/useForm'
import { activeNote, startDeleting } from '../../actions/notes'

export const NoteScreen = () => {

    const dispatch = useDispatch();
    const {active:note} = useSelector(state => state.notes);
    const [formValues, handleInputChange, reset] = useForm(note);

    const activeId = useRef(note.id)

    console.log(note)

    const{body, title, id} = formValues;
    //ejecuta un redibujado o renderizado segun condicion
    useEffect(() => {
        if(note.id !== activeId.current) //si el id seleccionado es diferente al de memoria
        {
            reset(note); //se resetea el formulario
            activeId.current = note.id //el id de memoria se actualiza
        }
    }, [note, reset]) //se dispara cuando hay cambios en note y en el evento de reseteo


    useEffect(() => {
        dispatch(activeNote(formValues.id, {...formValues}))
    }, [formValues])


    const handleDelete = () => {
        dispatch(startDeleting(id));
    }




    return (
        <div className="notes__main-content">
            <NotesAppBar/>
            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input" 
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                />
                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    name="body"
                    value={body}
                    onChange={handleInputChange}
                ></textarea>

                {
                    (note.url) 
                    &&
                    (<div className="notes__image mt-5">
                        <img 
                            src={note.url}
                            alt="Imagen"
                        />
                    </div>)
                }

            </div>

            <button
            className="btn btn-danger"
            onClick={handleDelete}
            >
                Delete
            </button>


        </div>
    )
}
