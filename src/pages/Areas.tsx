import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Modal, Spinner } from "reactstrap";
import Scroll from "../components/UI/Layout/Scroll";
import AddAreaBody from "../components/UI/Modals/Areas/AddAreaBody";
import EditAreaBody from "../components/UI/Modals/Areas/EditAreaBody";
import DeleteBody from "../components/UI/Modals/DeleteBody";
import AreaDTO from "../dtos/AreaDTO";
import { deleteArea, getAllAreas, switchActiveArea } from "../services/areaService";

export default function Areas() {
    const [areas, setAreas] = useState<any[]>([])
    const [loaded, setLoaded] = useState(false)
    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [itemSelected, setItemSelected] = useState({
        id: 0,
        name: "",
        active: false
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
        setAreas(await getAllAreas("sort=ordinal,asc"))
        setLoaded(true)
    }
    useEffect(() => {
        refresh()
    }, []);
    return (
        <main>
            <div className="filters d-flex mx-4 align-items-center justify-content-end">
                <FormGroup className="viewFilter">
                    <Input
                        id="viewFilter"
                        name="viewFilter"
                        type="select"
                        onChange={handleTableFilter}
                        value={tableFilter}
                        disabled={!loaded}
                        width={"20%"}
                        hidden={!loaded}
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
                <Button onClick={toggleAddModal} color='danger' type='button'>Agregar Shijva</Button>
                <Modal isOpen={addModal} toggle={toggleAddModal} ><AddAreaBody title='Agregar' refresh={refresh} toggle={toggleAddModal} /></Modal>
                <Modal isOpen={editModal} toggle={toggleEditModal} ><EditAreaBody title='Editar' refresh={refresh} toggle={toggleEditModal} item={itemSelected} /></Modal>
            </div>
            <div className="justify-content-center table-content mx-3 mt-4">

                {loaded ? <table className="table table-hover table-responsive">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {areas
                            .filter((area: AreaDTO) => (!((tableFilter === 'Inactivos' && area.active) || (tableFilter === 'Activos' && !area.active))))
                            .map(area => (
                                <tr key={area.id}>
                                    <td>{area.name}</td>
                                    <td>
                                        <span className="actions">
                                            <button type="button" className="btn btn-danger" onClick={() => toggleEditModal({ id: area.id })}><i className=" fas fa-edit"></i></button>
                                            <button type='button' className="btn btn-danger" onClick={() => handleDelete({ id: area.id, name: area.name, active: area.active })} ><i className="fas fa-trash"></i></button></span>
                                    </td>
                                </tr>
                            )
                            )}
                    </tbody>
                    <Modal isOpen={deleteModal} toggle={toggleDeleteModal} ><DeleteBody title='Eliminar Shijva' refresh={refresh} toggle={toggleDeleteModal} item={itemSelected} delete={deleteArea} switchActive={switchActiveArea} /></Modal>
                </table>
                    :
                    <div className="text-center">
                        <h2>Cargando Lista de Shijvot...</h2>
                        <Spinner animation="border" className='text-danger my-2' variant="light" />
                    </div>
                }
            </div>
            <Scroll showBelow={250} />
        </main >
    );
}