import React, { useState, useEffect } from 'react'
import Modal from "../components/UI/Modal";
import { getJanijim } from '../services/janijService';

export default function Janijim() {
    const [title, setTitle] = useState("")
    const [janijId, setJanijId] = useState(Number)
    const [janijim, setJanijim] = useState<any[]>([])
    const [loaded, setLoaded] = useState(false)
    const handleAdd = () => {
        setTitle("Agregar")
    }
    const handleEdit = (id: number) => {
        setTitle("Editar")
        setJanijId(id)
    }
    const refresh = () => {
        fetchData()
    }
    async function fetchData() {
        setLoaded(false)
        setJanijim(await getJanijim())
        setLoaded(true)
    }
    useEffect(() => {
        fetchData()
    }, []);

    return (
        <main>
            <div className="filters d-flex justify-content-end mx-5 mb-3">
                <button onClick={refresh} type="button" className="btn btn-danger mx-3"><i className="fa fa-refresh"></i></button>
                <button onClick={handleAdd} type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modaljanij">
                    Agregar Janij
                </button>
                <Modal title={title} modalName="modaljanij" id={janijId} />
            </div>
            <div className="justify-content-center table-content mx-3 w-95">

                {loaded ? <table className="table table-hover table-responsive">
                    <thead>
                        <tr>
                            <th scope="col">Nombre y Apellido</th>
                            <th scope="col">Grupo</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {janijim.map(janij => (
                            <tr>
                                <td>{`${janij.name} ${janij.familySurname}`}</td>
                                <td>{janij.groupName}</td>
                                <td>
                                    <span className="actions">
                                        <button onClick={() => handleEdit(janij.ID)} type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modaljanij" ><i className=" fas fa-edit"></i></button>
                                        <button type='button' className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalDelete" ><i className="fas fa-trash"></i></button></span>
                                </td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table> :

                    <div className="text-center">
                        <h2>Cargando Lista de Janijim...</h2>
                        <div className="spinner-border text-danger mx-auto" role="status">
                            <span className="sr-only">Cargando</span>
                        </div>
                    </div>

                }
            </div>
        </main>
    );
}