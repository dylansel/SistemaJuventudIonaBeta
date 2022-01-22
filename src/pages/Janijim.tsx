import React, { useState, useEffect } from 'react'
import { Button, Modal, Spinner } from 'reactstrap';
import Scroll from '../components/UI/Layout/Scroll';
import AddJanijBody from "../components/UI/Modals/Janijim/AddJanijBody";
import DeleteBody from '../components/UI/Modals/DeleteBody';
import { addFamily, getAllFamilies } from '../services/familyService';
import { addJanij, deleteJanij, updateJanij } from '../services/janijService';
import { getAllJanijim } from '../services/janijService';
import { capitalizeAllWords, isEmptyOrSpaces } from '../utils/misc/strings';
import EditJanijBody from '../components/UI/Modals/Janijim/EditJanijBody';

export default function Janijim() {
    const [janijim, setJanijim] = useState<any[]>([])
    const [loaded, setLoaded] = useState(false)
    const [addError, setAddError] = useState(false)
    const [editError, setEditError] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [itemSelected, setItemSelected] = useState({
        id: 0,
        name: ""
    })
    const initialFieldsState = {
        name: '',
        groupId: 1,
        leadersCourse: false,
        familyId: -1,
        familySurname: ''
    }
    const [addFields, setAddFields] = useState(initialFieldsState)
    const [editFields, setEditFields] = useState(initialFieldsState)

    const addChangeFamily = (e: any) => {
        const nameToFill = isNaN(e.value) ? "familySurname" : "familyId"
        const nameToErase = !isNaN(e.value) ? "familySurname" : "familyId"
        setAddFields(prevState => ({
            ...prevState,
            [nameToFill]: e.value,
            [nameToErase]: ""
        }))
    }
    const editChangeFamily = (e: any) => {
        const nameToFill = isNaN(e.value) ? "familySurname" : "familyId"
        const nameToErase = !isNaN(e.value) ? "familySurname" : "familyId"
        setEditFields(prevState => ({
            ...prevState,
            [nameToFill]: e.value,
            [nameToErase]: ""
        }))
    }
    const addHandleChange = (e: any) => {
        let { name, value } = e.target
        if (name === "groupId") {
            value = parseInt(value)
        } else if (name === "leadersCourse") {
            value = e.target.checked
        }
        setAddFields(prevState => ({
            ...prevState,
            [name]: value
        }))

    }
    const editHandleChange = (e: any) => {
        let { name, value } = e.target
        if (name === "groupId") {
            value = parseInt(value)
        } else if (name === "leadersCourse") {
            value = e.target.checked
        }
        setEditFields(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const toggleAddModal = () => setAddModal(!addModal)
    const toggleEditModal = (item?: any) => {
        setItemSelected(item)
        setEditModal(!editModal)
    }
    const toggleDeleteModal = () => setDeleteModal(!deleteModal)

    const toggleCancelAddModal = () => {
        setAddError(false)
        setAddFields(initialFieldsState)
        setAddModal(!addModal)
    }
    const toggleCancelEditModal = () => {
        setEditError(false)
        setEditFields(initialFieldsState)
        setEditModal(!editModal)
    }
    const handleDelete = (item: any) => {
        setItemSelected(item)
        toggleDeleteModal()
    }
    const postRequest = async () => {
        setAddError(false)
        if (isEmptyOrSpaces(addFields.name) || (isEmptyOrSpaces(addFields.familySurname) && addFields.familyId === -1)) {
            setAddError(true)
            return
        }
        const name = capitalizeAllWords(addFields.name)
        let familyId
        if (addFields.familySurname === "" && addFields.familyId !== 0) {
            familyId = addFields.familyId
        }
        else {
            const surname = capitalizeAllWords(addFields.familySurname)
            await addFamily({ surname, discount: 0 })
            const families: any = await getAllFamilies()
            familyId = families.at(-1).id
        }
        const janijToAdd = {
            groupId: addFields.groupId,
            name,
            leadersCourse: addFields.leadersCourse,
            familyId
        }
        setIsSaving(true)
        await addJanij(janijToAdd)
        toggleAddModal()
        setIsSaving(false)
        setAddFields(initialFieldsState)
        refresh()
    }
    const updateRequest = async () => {
        setEditError(false)
        if (isEmptyOrSpaces(editFields.name) || (isEmptyOrSpaces(editFields.familySurname) && editFields.familyId === -1)) {
            setEditError(true)
            return
        }
        const name = capitalizeAllWords(editFields.name)
        let familyId
        if (editFields.familySurname === "" && editFields.familyId !== 0) {
            familyId = editFields.familyId
        }
        else {
            const surname = capitalizeAllWords(editFields.familySurname)
            await addFamily({ surname, discount: 0 })
            const families: any = await getAllFamilies()
            familyId = families.at(-1).id
        }
        const janijToEdit = {
            groupId: editFields.groupId,
            name,
            leadersCourse: editFields.leadersCourse,
            familyId
        }
        setIsEditing(true)
        console.log(itemSelected.id)
        await updateJanij(itemSelected.id, janijToEdit)
        toggleEditModal()
        setIsEditing(false)
        setEditFields(initialFieldsState)
        refresh()
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
            <div className="filters d-flex justify-content-end mx-5 mb-3">
                <Button color='danger' onClick={refresh} type='button' className="mx-3"><i className="fa fa-refresh"></i></Button>
                <Button onClick={toggleAddModal} color='danger' type='button'>Agregar Janij</Button>
                <Modal isOpen={addModal} toggle={toggleAddModal} ><AddJanijBody title='Agregar' error={addError} toggler={toggleCancelAddModal} change={addHandleChange} changeFamily={addChangeFamily} action={postRequest} isSaving={isSaving} /></Modal>
                <Modal isOpen={editModal} toggle={toggleEditModal} ><EditJanijBody title='Editar' error={editError} toggler={toggleCancelEditModal} item={itemSelected} change={editHandleChange} changeFamily={editChangeFamily} action={updateRequest} isEditing={isEditing} /></Modal>
            </div>
            <div className="justify-content-center table-content mx-3">

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