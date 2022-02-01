import React, { useState, useEffect } from 'react'
import { Button, FormGroup, Input, Label, Modal, Spinner } from 'reactstrap';
import Scroll from '../components/UI/Layout/Scroll';
import AddJanijBody from "../components/UI/Modals/Janijim/AddJanijBody";
import DeleteBody from '../components/UI/Modals/DeleteBody';
import { deleteJanij, getAllJanijim } from '../services/janijService';
import EditJanijBody from '../components/UI/Modals/Janijim/EditJanijBody';
import JanijDTO from '../dtos/JanijDTO';

export default function Janijim() {
    const [janijim, setJanijim] = useState<any[]>([])
    const [loaded, setLoaded] = useState(false)
    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [itemSelected, setItemSelected] = useState({
        id: 0,
        name: ""
    })

    const toggleAddModal = () => setAddModal(!addModal)
    const toggleEditModal = (item?: any) => {
        setItemSelected(item)
        setEditModal(!editModal)
    }
    const toggleDeleteModal = () => setDeleteModal(!deleteModal)

    const handleDelete = (item: any) => {
        setItemSelected(item)
        toggleDeleteModal()
    }

    const [tableFilter, setTableFilter] = useState("Activos")
    const handleTableFilter = (e: any) => {
        setTableFilter(e.target.value)
    }

    const refresh = () => {
        fetchData()
    }
    async function fetchData() {
        setLoaded(false)
        setJanijim(await getAllJanijim("sort=group.ordinal,asc;firstName,asc;family.surname,asc"))
        setLoaded(true)
    }
    useEffect(() => {
        fetchData()
    }, []);

    return (
        <main>
            <div className="filters d-flex mx-4 align-items-center justify-content-end">
                <FormGroup>
                    <Input
                        id="viewFilter"
                        name="viewFilter"
                        type="select"
                        onChange={handleTableFilter}
                        value={tableFilter}
                        disabled={!loaded}
                        width={"20%"}
                    >
                        {loaded && (
                            <>
                                <option>Activos</option>
                                <option>Inactivos</option>
                                <option>Todos</option>
                            </>)
                        }
                    </Input>
                </FormGroup>
                <Button color='danger' onClick={refresh} type='button' className="mx-3"><i className="fa fa-refresh"></i></Button>
                <Button onClick={toggleAddModal} color='danger' type='button'>Agregar Janij</Button>
                <Modal isOpen={addModal} toggle={toggleAddModal} ><AddJanijBody title='Agregar' toggle={toggleAddModal} refresh={refresh} /></Modal>
                <Modal isOpen={editModal} toggle={toggleEditModal} ><EditJanijBody title='Editar' refresh={refresh} toggle={toggleEditModal} item={itemSelected} /></Modal>
            </div>
            <div className="justify-content-center table-content mx-3 mt-4">

                {loaded ? <table className="table table-hover table-responsive">
                    <thead>
                        <tr>
                            <th scope="col">Nombre y Apellido</th>
                            <th scope="col">Grupo</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            janijim
                                .filter((janij: JanijDTO) => (!((tableFilter === 'Inactivos' && janij.active) || (tableFilter === 'Activos' && !janij.active))))
                                .map(janij => (
                                    <tr key={janij.id}>
                                        <td>{`${janij.name} ${janij.familySurname}`}</td>
                                        <td>{janij.groupName}</td>
                                        <td>
                                            <span className="actions">
                                                <button type="button" className="btn btn-danger" onClick={() => toggleEditModal({ id: janij.id })}><i className=" fas fa-edit"></i></button>
                                                <button type='button' className="btn btn-danger" onClick={() => handleDelete({ id: janij.id, name: `${janij.name} ${janij.familySurname}` })} ><i className="fas fa-trash"></i></button></span>
                                        </td>
                                    </tr>
                                )
                                )}
                    </tbody>
                    <Modal isOpen={deleteModal} toggle={toggleDeleteModal} ><DeleteBody title='Eliminar Janij' refresh={refresh} toggle={toggleDeleteModal} item={itemSelected} function={deleteJanij} /></Modal>
                </table>
                    :
                    <div className="text-center">
                        <h2>Cargando Lista de Janijim...</h2>
                        <Spinner animation="border" className='text-danger my-2' variant="light" />
                    </div>
                }
            </div>
            <Scroll showBelow={250} />
        </main>
    );
}