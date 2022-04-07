import { withAuthenticationRequired } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Modal, Spinner } from "reactstrap";
import Scroll from "../components/UI/Layout/Scroll";
import AddAreaBody from "../components/UI/Modals/Areas/AddAreaBody";
import EditAreaBody from "../components/UI/Modals/Areas/EditAreaBody";
import DeleteBody from "../components/UI/Modals/DeleteBody";
import AreaDTO from "../dtos/AreaDTO";
import { deleteArea, getAllAreas, switchActiveArea } from "../services/areaService";
import Loading from "./misc/Loading";
import SkeletonRows from "./misc/SkeletonRows";

function Areas() {
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

    const handleActive = async (item: any) => {
        await switchActiveArea(item.id, item.active)
        refresh()
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

    let i = 0

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
                <Button color='danger' title='Actualizar' onClick={refresh} type='button' className="mx-3"><i className="fa fa-refresh"></i></Button>
                <Button onClick={toggleAddModal} color='danger' type='button'>Agregar Shijva</Button>
                <Modal isOpen={addModal} toggle={toggleAddModal} ><AddAreaBody title='Agregar' refresh={refresh} toggle={toggleAddModal} /></Modal>
                <Modal isOpen={editModal} toggle={toggleEditModal} ><EditAreaBody title='Editar' refresh={refresh} toggle={toggleEditModal} item={itemSelected} /></Modal>
            </div>
            <div className="justify-content-center table-content mx-3 mt-4">

                <table className={`table ${loaded && 'table-hover'} table-responsive`}>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loaded && <SkeletonRows rows ={50} columns={3}/>}
                        {loaded && areas
                            .filter((area: AreaDTO) => (!((tableFilter === 'Inactivos' && area.active) || (tableFilter === 'Activos' && !area.active))))
                            .map(area => (
                                <tr key={area.id} className={!area.active && tableFilter === 'Todos' ? "rowDisabled" : ""}>
                                    <td>{++i}</td>
                                    <td>{area.name}</td>
                                    <td>
                                        <span className="actions d-flex">
                                            <button type="button" title='Editar' className="btn btn-danger" onClick={() => toggleEditModal({ id: area.id })}><i className=" fas fa-edit"></i></button>
                                            <button type="button" title={area.active ? 'Desactivar' : 'Activar'} className="btn btn-danger" onClick={() => handleActive({ id: area.id, active: !area.active })}><i className={`fas ${area.active ? 'fa-eye-slash' : 'fa-eye'}`}></i></button>
                                            <button type='button' className="btn btn-danger" onClick={() => handleDelete({ id: area.id, name: area.name, active: area.active })} ><i className="fas fa-trash"></i></button>
                                        </span>
                                    </td>
                                </tr>
                            )
                            )}
                    </tbody>
                    <Modal isOpen={deleteModal} toggle={toggleDeleteModal} ><DeleteBody title='Eliminar Shijva' refresh={refresh} toggle={toggleDeleteModal} item={itemSelected} delete={deleteArea} /></Modal>
                </table>
            </div>
            <Scroll showBelow={250} />
        </main >
    );
}

export default withAuthenticationRequired(Areas, {
    onRedirecting: () => <Loading />,
});