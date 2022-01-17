import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "reactstrap";
import Scroll from "../components/UI/Layout/Scroll";
import AddAreaBody from "../components/UI/Modals/AddAreaBody";
import DeleteBody from "../components/UI/Modals/DeleteBody";
import { addArea, deleteArea, getAllAreas } from "../services/areaService";
import { capitalizeAllWords, isEmptyOrSpaces } from "../utils/misc/strings";

export default function Areas() {
    const [areas, setAreas] = useState<any[]>([])
    const [loaded, setLoaded] = useState(false)
    const [addError, setAddError] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [addModal, setAddModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [itemSelected, setItemSelected] = useState({
        id: 0,
        name: ""
    })
    const initialFieldsState = {
        name: "",
        ordinal: 0,
    }
    const [addFields, setAddFields] = useState(initialFieldsState)

    const handleChange = (e: any) => {
        let { name, value } = e.target
        if (name === "ordinal") {
            value = parseInt(value)
        }
        setAddFields(prevState => ({
            ...prevState,
            [name]: value
        }))

    }
    const toggleAddModal = () => setAddModal(!addModal)
    const toggleDeleteModal = () => setDeleteModal(!deleteModal)

    const toggleCancelAddModal = () => {
        setAddError(false)
        setAddFields(initialFieldsState)
        setAddModal(!addModal)
    }
    const handleDelete = (item: any) => {
        setItemSelected(item)
        toggleDeleteModal()
    }
    const postRequest = async () => {
        setAddError(false)
        if (isEmptyOrSpaces(addFields.name) || addFields.ordinal === 0) {
            setAddError(true)
            return
        }
        const name = capitalizeAllWords(addFields.name)
        const areaToAdd = {
            name,
            ordinal: addFields.ordinal,
        }
        setIsSaving(true)
        await addArea(areaToAdd)
        toggleAddModal()
        setIsSaving(false)
        setAddFields(initialFieldsState)
        refresh()
    }
    const deleteRequest = (id: number) => {
        deleteArea(id)
        toggleDeleteModal()
        refresh()
    }
    const refresh = () => {
        fetchData()
    }
    async function fetchData() {
        setLoaded(false)
        setAreas(await getAllAreas())
        setLoaded(true)
    }
    useEffect(() => {
        fetchData()
    }, []);
    return (
        <main>
            <div className="filters d-flex justify-content-end mx-5 mb-3">
                <Button color='danger' onClick={refresh} type='button' className="mx-3"><i className="fa fa-refresh"></i></Button>
                <Button onClick={toggleAddModal} color='danger' type='button'>Agregar Shijva</Button>
                {<Modal isOpen={addModal} toggle={toggleAddModal} ><AddAreaBody title='Agregar' error={addError} toggler={toggleCancelAddModal} change={handleChange} action={postRequest} isSaving={isSaving} /></Modal>}
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
                        {areas.map(area => (
                            <tr key={area.id}>
                                <td>{area.name}</td>
                                <td>
                                    <span className="actions">
                                        <button type="button" className="btn btn-danger" ><i className=" fas fa-edit"></i></button>
                                        <button type='button' className="btn btn-danger" onClick={() => handleDelete({ id: area.id, name: area.name })} ><i className="fas fa-trash"></i></button></span>
                                </td>
                            </tr>
                        )
                        )}
                    </tbody>
                    <Modal isOpen={deleteModal} toggle={toggleDeleteModal} ><DeleteBody title='Eliminar Shijva' toggler={toggleDeleteModal} itemSelected={itemSelected} function={deleteRequest} /></Modal>
                </table>
                    :
                    <div className="text-center">
                        <h2>Cargando Lista de Shijvot...</h2>
                        <Spinner animation="border" className='text-danger my-2' variant="light" />
                    </div>
                }
            </div>
            <Scroll showBelow={250} />
        </main>
    );
}