import React from 'react'

export default function NotFound() {
    return (
        <main>
            <div className="main-container row justify-content-around mx-5 flex-xs-row-reverse   ">
                <div className="col-12 col-md-6 col-xl-4">
                    <h1>Ups... Querido amigo Ionero, tengo algo malo que contarte :(</h1>
                    <h2 style={{ color: 'red' }}>No existe la página que estás buscando</h2>
                    <h5 className="my-5">Señores yo dejo todo...</h5>
                    <img className='w-100' src="https://media.tumblr.com/tumblr_m81n1fgvi81qkn20e.gif" /><br />
                </div>
            </div>

        </main>
    )
}
