import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "reactstrap";
import Scroll from "../components/UI/Layout/Scroll";
import AddGroupBody from "../components/UI/Modals/Groups/AddGroupBody";
import DeleteBody from "../components/UI/Modals/DeleteBody";
import { deleteGroup, getAllGroups } from "../services/groupService";
import EditGroupBody from "../components/UI/Modals/Groups/EditGroupBody";

export default function Groups() {
    const [groups, setGroups] = useState<any[]>([])
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

    const refresh = () => {
        fetchData()
    }
    async function fetchData() {
        setLoaded(false)
        setGroups(await getAllGroups("sort=ordinal,asc"))
        setLoaded(true)
    }
    useEffect(() => {
        refresh()
    }, []);
    return (
        <main>
            <div className="filters d-flex justify-content-end mx-5 mb-3">
                <Button color='danger' onClick={refresh} type='button' className="mx-3"><i className="fa fa-refresh"></i></Button>
                <Button onClick={toggleAddModal} color='danger' type='button'>Agregar Grupo</Button>
                <Modal isOpen={addModal} toggle={toggleAddModal} ><AddGroupBody title='Agregar' refresh={refresh} toggle={toggleAddModal} /></Modal>
                <Modal isOpen={editModal} toggle={toggleEditModal} ><EditGroupBody title='Editar' refresh={refresh} toggle={toggleEditModal} item={itemSelected} /></Modal>

            </div>
            <div className="justify-content-center table-content mx-3">

                {loaded ? <table className="table table-hover table-responsive">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Shijva</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groups.map(group => (
                            <tr key={group.id}>
                                <td>{group.name}</td>
                                <td>{group.areaName}</td>
                                <td>
                                    <span className="actions">
                                        <button type="button" className="btn btn-danger" onClick={() => toggleEditModal({ id: group.id })}><i className=" fas fa-edit"></i></button>
                                        <button type='button' className="btn btn-danger" onClick={() => handleDelete({ id: group.id, name: group.name })} ><i className="fas fa-trash"></i></button></span>
                                </td>
                            </tr>
                        )
                        )}
                    </tbody>
                    <Modal isOpen={deleteModal} toggle={toggleDeleteModal} ><DeleteBody title='Eliminar Grupo' refresh={refresh} toggle={toggleDeleteModal} item={itemSelected} function={deleteGroup}/></Modal>
                </table>
                    :
                    <div className="text-center">
                        <h2>Cargando Lista de Grupos...</h2>
                        <Spinner animation="border" className='text-danger my-2' variant="light" />
                    </div>
                }
            </div>
            <Scroll showBelow={250} />
        </main>
    );
}