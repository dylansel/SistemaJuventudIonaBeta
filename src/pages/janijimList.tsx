import React, { useState, useEffect } from 'react'
import Modal from "../components/Modal";
import axios from 'axios';
import { BACKEND_URL } from '../constants/BACKEND_URL';


export default function JanijimLista() {

    const [title, setTitle] = useState("")
    const [janijId, setJanijId] = useState(Number)
    const [janijim, setJanijim] = useState<any[]>([])
    const handleAdd = () => {
        setTitle("Agregar")
    }
    const handleEdit = (id: number) => {
        setTitle("Editar")
        setJanijId(id)
    }
    useEffect(() => {
        axios
            .get(`${BACKEND_URL}/janij/getAll`)
            .then(res => {
                setJanijim(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (

        <main>
            <div className="filters d-flex justify-content-end mx-5 mb-3">
                <button onClick={handleAdd} type="button" className="btn btn-danger" data-toggle="modal" data-target="#modaljanij">
                    Agregar Janij
                </button>
                <Modal title={title} modalName="modaljanij" id={janijId} />
            </div>
            <div className="table-content mx-5">
                <table className="table table-hover table-responsive">
                    <thead>
                        <tr>
                            <th scope="col">Nombre y Apellido</th>
                            <th scope="col">Grupo</th>
                            <th scope="col">Curso</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {janijim.map(janij => (
                            <tr>
                                <td scope="col">{`${janij.name} ${janij.familySurname}`}</td>
                                <td scope="col">{janij.groupName}</td>
                                <td scope="col">{janij.leadersCourse ? "Si" : "No"}</td>
                                <td scope="col">
                                    <span className="actions">
                                        <button onClick={() => handleEdit(janij.ID)} type="button" className="btn btn-danger" data-toggle="modal" data-target="#modaljanij" ><i className=" fas fa-edit"></i></button>
                                        <button type='button' className="btn btn-danger" data-toggle="modal" data-target="#modalDelete" ><i className="fas fa-trash"></i></button></span>
                                    <div className="modal fade" id='modalDelete' role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="modaljanij">Está seguro que desea eliminar?</h5>
                                                    <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close">
                                                    </button>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                                    <button type="button" className="btn btn-danger" data-dismiss="modal" >Eliminar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table>
            </div >
        </main >
    );
}