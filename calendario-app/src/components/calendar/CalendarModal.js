import React, { useState } from 'react'
import Modal from 'react-modal'
import DateTimePicker  from 'react-datetime-picker'
import moment from 'moment';
import Swal from 'sweetalert2';
import "../../style.css"
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/actions';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const end = now.clone().add(1, 'hours');

export const CalendarModal = () => {
    
    const {modalOpen} = useSelector(state => state.ui);

    const dispatch = useDispatch();

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(end.toDate());
    const [titleValue, setTitleValue] = useState(true);

    const [formValues, setFormValues] = useState({
        title: 'Evento',
        notes: '',
        start: now.toDate(),
        end: end.toDate(),
    });

    const {notes, title} = formValues;

    const handleInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const closeModal = () => {
        dispatch(uiCloseModal());
    }

    const handleStartDateChange = (e) => {
        setDateStart(e);
        setFormValues({
            ...formValues,
            start: e
        });
    }

    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setFormValues({
            ...formValues,
            start: e
        });
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        
        const momentStart = moment(now);
        const momentEnd = moment(end);

        if(momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire('La fecha 2 debe ser mayor a la fecha 1');
        }

        if(title.trim().length < 2)
        {
            setTitleValue(false);
        }
        //TODO: realizar grabacion en la bd
        
        setTitleValue(true);
        closeModal();
    }

    return (
        <Modal
            isOpen={modalOpen}
            //onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={500}
            className="modal"
            overlayClassName="modal-fondo"
            contentLabel="Example Modal"
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form 
                className="container"
                onSubmit={handleSubmitForm}
            >
                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker 
                    onChange={handleStartDateChange}
                    value={dateStart}
                    className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker 
                    onChange={handleEndDateChange}
                    value={dateEnd}
                    minDate={dateStart}
                    className="form-control"
                    />
                </div>
                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${!titleValue && 'is-invalid'}`}
                        placeholder="T??tulo del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange= {handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripci??n corta</small>
                </div>
                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Informaci??n adicional</small>
                </div>
                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>
            </form>
        </Modal>
    )
}
