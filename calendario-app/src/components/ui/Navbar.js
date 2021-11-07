import React from 'react'

export const Navbar = () => {
    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand mx-3">Cristiand</span>
            <button className="btn btn-outline-danger my-2 my-sm-0 mx-3">
                <i className="fas fa-sign-out-alt"></i> Salir
            </button>
        </div>
    )
}
