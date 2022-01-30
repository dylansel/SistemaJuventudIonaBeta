import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Collapse, Modal, Spinner } from "reactstrap";
import Scroll from "../components/UI/Layout/Scroll";
import DeleteBody from "../components/UI/Modals/DeleteBody";
import EditFamilyBody from "../components/UI/Modals/Families/EditFamilyBody";
import JanijDTO from "../dtos/JanijDTO";
import { getAllFamilies, deleteFamily } from "../services/familyService";

function Families() {

    const [families, setFamilies] = useState<any[]>([])
    const [loaded, setLoaded] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [itemSelected, setItemSelected] = useState({
        id: 0,
        name: ""
    })

    document.getElementsByClassName('collapse-btn')

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
        setFamilies(await getAllFamilies("sort=surname,asc"))
        setLoaded(true)
    }
    useEffect(() => {
        refresh()
    }, []);

    return (
        <main>
            <div className="filters d-flex justify-content-end mx-5 mb-3">
                <Button color='danger' onClick={refresh} type='button' className="mx-3"><i className="fa fa-refresh"></i></Button>
                <Modal isOpen={editModal} toggle={toggleEditModal} ><EditFamilyBody title='Editar' refresh={refresh} toggle={toggleEditModal} item={itemSelected} /></Modal>
            </div>
            <div className="justify-content-center table-content mx-3">

                {loaded ? <table className="table table-hover table-responsive">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {families.map(family => (
                            <tr key={family.id}>
                                <td className="w-50">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${family.id}`} aria-expanded="false" aria-controls={family.id}>{family.surname}</button>

                                    <div className="collapse" id={`collapse${family.id}`}>
                                        <div className="card card-body">
                                            {family.janijim.map((janij: JanijDTO) => (
                                                <p>{janij.name} {` (${janij.groupName})`} </p>
                                            ))}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="actions">
                                        <button type="button" className="btn btn-danger" onClick={() => toggleEditModal({ id: family.id })}><i className=" fas fa-edit"></i></button>
                                        <button type='button' className="btn btn-danger" onClick={() => handleDelete({ id: family.id, name: family.surname })} ><i className="fas fa-trash"></i></button></span>
                                </td>
                            </tr>
                        )
                        )}
                    </tbody>
                    <Modal isOpen={deleteModal} toggle={toggleDeleteModal} ><DeleteBody title='Eliminar Familia' refresh={refresh} toggle={toggleDeleteModal} item={itemSelected} function={deleteFamily} /></Modal>
                </table>
                    :
                    <div className="text-center">
                        <h2>Cargando Lista de Familias...</h2>
                        <Spinner animation="border" className='text-danger my-2' variant="light" />
                    </div>
                }
            </div>
            <Scroll showBelow={250} />
        </main >
    )
}
export default Families