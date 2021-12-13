import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uiOpenModal } from '../../actions/actions';

export const AddNewFab = () => {

    const state = useSelector(state => state.ui);

    const dispatch = useDispatch();

    const openModal = () => {
        dispatch(uiOpenModal());
    }

    return (
        <button
            className='btn btn-primary fab'
            onClick={openModal}
        >
            <i className='fas fa-plus'></i>
        </button>
    )
}
