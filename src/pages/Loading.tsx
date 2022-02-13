import React from 'react'
import { Spinner } from 'reactstrap'

export default function Loading() {
    return (
        <main>
            <div className="main-container row justify-content-around mx-5 flex-xs-row-reverse text-center  ">
                <div className="col-12 col-md-6 col-xl-4">
                    <Spinner animation="border" className='text-danger my-2' variant="light" size="lg" />
                    <h1>Cargando...</h1>
                </div>
            </div>

        </main>
    )
}
