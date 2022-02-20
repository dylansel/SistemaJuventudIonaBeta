import React from 'react'
import { Link } from 'react-router-dom'

export default function NotLoggedIn() {
    return (
        <main>
            <div className="main-container row justify-content-around mx-5 flex-xs-row-reverse   ">
                <div className="col-12 col-md-6 col-xl-4">
                    <h1>Ups... Querido amigo Ionero, tengo algo malo que contarte :(</h1>
                    <h2 style={{ color: 'red' }}>No iniciaste sesión...</h2>
                    <h5 className="my-5">Para iniciar sesión haz click{" "}
                        <Link to="/login">aquí</Link></h5>
                </div>
            </div>

        </main>
    )
}
