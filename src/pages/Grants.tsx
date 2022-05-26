import { withAuthenticationRequired } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Modal } from "reactstrap";
import Scroll from "../components/UI/Layout/Scroll";
import AddGrantsBody from "../components/UI/Modals/Grants/AddGrantsBody";
import EditGrantsBody from "../components/UI/Modals/Grants/EditGrantsBody";
import DeleteBody from "../components/UI/Modals/DeleteBody";
import GrantDTO from "../dtos/GrantDTO";
import { deleteGrant, getAllGrants } from "../services/grantService";
import Loading from "./misc/Loading";
import SkeletonRows from "./misc/SkeletonRows";
import { filterActiveToMonth, isActiveToMonth } from '../utils/misc/filter';
import {formatDateToEsYearMonth} from '../utils/misc/dates'
function Grants() {
    const [grants, setGrants] = useState<GrantDTO[]>([])
    const [loaded, setLoaded] = useState<boolean>(false)
    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [itemSelected, setItemSelected] = useState({
        id: 0,
        familyId: 0,
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
        setGrants(await getAllGrants("sort=familySurname,asc"))
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
                <Button color='danger' title='Actualizar' onClick={refresh} type='button' className="mx-3"><i className="fa fa-refresh"></i></Button>
                <Button onClick={toggleAddModal} color='danger' type='button'>Agregar Beca</Button>
                <Modal isOpen={addModal} toggle={toggleAddModal} ><AddGrantsBody title='Agregar' refresh={refresh} toggle={toggleAddModal} /></Modal>
                <Modal isOpen={editModal} toggle={toggleEditModal} ><EditGrantsBody title='Editar' refresh={refresh} toggle={toggleEditModal} item={itemSelected} /></Modal>
            </div>
            <div className="justify-content-center table-content mx-3 mt-4">

                <table className={`table ${loaded && 'table-hover'} table-responsive`}>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Familia</th>
                            <th scope="col">Porcentaje</th>
                            <th scope="col">Periodo</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loaded && <SkeletonRows rows={50} columns={5} />}
                        {loaded && grants
                            .filter((grant: GrantDTO) => filterActiveToMonth(tableFilter, grant.since, grant.until))
                            .map((grant: GrantDTO, index: number) => (
                                <tr key={grant.id} className={!isActiveToMonth(grant.since, grant.until) && tableFilter === 'Todos' ? "rowDisabled" : ""}>
                                    <td>{index + 1}</td>
                                    <td>{grant.family.surname}</td>
                                    <td>{grant.percentile * 100}%</td>
                                    <td> {formatDateToEsYearMonth(grant.since,"")} - {formatDateToEsYearMonth(grant.until,"")}</td>
                                    <td>
                                        {<span className="actions d-flex">
                                            <button type="button" title='Editar' className="btn btn-danger" onClick={() => toggleEditModal({ id: grant.id })}><i className=" fas fa-edit"></i></button>
                                            <button type='button' className="btn btn-danger" onClick={() => handleDelete({ id: grant.id, name: grant.family.surname })} ><i className="fas fa-trash"></i></button>
                                        </span>
                                        }
                                    </td>
                                </tr>
                            )
                            )}
                    </tbody>
                    <Modal isOpen={deleteModal} toggle={toggleDeleteModal} ><DeleteBody title='Eliminar Beca' refresh={refresh} toggle={toggleDeleteModal} item={itemSelected} delete={deleteGrant} /></Modal>
                </table>
            </div>
            <Scroll showBelow={250} />
        </main >
    );
}

export default withAuthenticationRequired(Grants, {
    onRedirecting: () => <Loading />,
});