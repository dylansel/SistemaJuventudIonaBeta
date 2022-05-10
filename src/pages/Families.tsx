import { withAuthenticationRequired } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Modal } from "reactstrap";
import Scroll from "../components/UI/Layout/Scroll";
import DeleteBody from "../components/UI/Modals/DeleteBody";
import EditFamilyBody from "../components/UI/Modals/Families/EditFamilyBody";
import FamilyDTO, { JanijDTO } from "../dtos/FamilyDTO";
import { getAllFamilies, deleteFamily, switchActiveFamily } from "../services/familyService";
import { filterActive } from "../utils/misc/filter";
import Loading from "./misc/Loading";
import SkeletonRows from "./misc/SkeletonRows";

function Families() {

    const [families, setFamilies] = useState<any[]>([])
    const [loaded, setLoaded] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [itemSelected, setItemSelected] = useState({
        id: 0,
        name: "",
        active: false
    })

    document.getElementsByClassName('collapse-btn')

    const toggleEditModal = (item?: any) => {
        setItemSelected(item)
        setEditModal(!editModal)
    }

    const handleActive = async (item: any) => {
        await switchActiveFamily(item.id, item.active)
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
        setFamilies(await getAllFamilies("sort=surname,asc"))
        setLoaded(true)
    }

    let i = 0

    useEffect(() => {
        refresh()
    }, []);

    return (
        <main>
            <div className="ffilters d-flex mx-4 align-items-center justify-content-end">
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
                <Modal isOpen={editModal} toggle={toggleEditModal} ><EditFamilyBody title='Editar' refresh={refresh} toggle={toggleEditModal} item={itemSelected} /></Modal>
            </div>
            <div className="justify-content-center table-content mx-3 mt-4">

                <table className={`table ${loaded && 'table-hover'} table-responsive`}>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loaded && <SkeletonRows rows={50} columns={3} />}
                        {loaded &&
                            families
                                .filter((family: FamilyDTO) => filterActive(tableFilter, family))
                                .map((family: FamilyDTO) => (
                                    <tr key={family.id} className={!family.active && tableFilter === 'Todos' ? "rowDisabled" : ""}>
                                        <td>{++i}</td>
                                        <td className="w-50">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${family.id}`} aria-expanded="false" aria-controls={family.id.toString()}><span className={!family.active && tableFilter === 'Todos' ? "rowDisabled" : ""}>{family.surname}</span></button>

                                            <div className="collapse" id={`collapse${family.id}`}>
                                                <div className="card card-body">
                                                    {family.janijim.map((janij: JanijDTO) => (
                                                        <p>{janij.name} {` (${janij.group.name})`} </p>
                                                    ))}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="actions d-flex">
                                                <button type="button" title='Editar' className="btn btn-danger" onClick={() => toggleEditModal({ id: family.id })}><i className=" fas fa-edit"></i></button>
                                                <button type="button" title={family.active ? 'Desactivar' : 'Activar'} className="btn btn-danger" onClick={() => handleActive({ id: family.id, active: !family.active })}><i className={`fas ${family.active ? 'fa-eye-slash' : 'fa-eye'}`}></i></button>
                                                <button type='button' title='Eliminar' className="btn btn-danger" onClick={() => handleDelete({ id: family.id, name: family.surname, active: family.active })} ><i className="fas fa-trash"></i></button>
                                            </span>
                                        </td>
                                    </tr>
                                )
                                )}
                    </tbody>
                    <Modal isOpen={deleteModal} toggle={toggleDeleteModal} ><DeleteBody title='Eliminar Familia' refresh={refresh} toggle={toggleDeleteModal} item={itemSelected} delete={deleteFamily} /></Modal>
                </table>

            </div>
            <Scroll showBelow={250} />
        </main >
    )
}

export default withAuthenticationRequired(Families, {
    onRedirecting: () => <Loading />,
});