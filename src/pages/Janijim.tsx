import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'reactstrap';
import AddJanijBody from "../components/UI/Modals/AddJanijBody";
import DeleteBody from '../components/UI/Modals/DeleteBody';
import { addFamily, getAllFamilies } from '../services/familyService';
import { addJanij, deleteJanij } from '../services/janijService';
import { getAllJanijim } from '../services/janijService';

export default function Janijim() {
    const [janijim, setJanijim] = useState<any[]>([])
    const [loaded, setLoaded] = useState(false)
    const [addModal, setAddModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    //const [familyOption, setFamilyOption] = useState('existingFamily')
    const [itemSelected, setItemSelected] = useState({
        id: 0,
        name: ""
    })
    const [addFields, setAddFields] = useState({
        name: '',
        groupId: 1,
        leadersCourse: false,
        familyId: 1,
        familySurname: ''
    })
    /*const handleFamilyOption = (e: any) => {
        setFamilyOption(e.target.value)
    }*/
    const changeFamily = (e: any) => {
        const nameToFill = isNaN(e.value) ? "familySurname" : "familyId"
        const nameToErase = !isNaN(e.value) ? "familySurname" : "familyId"
        setAddFields(prevState => ({
            ...prevState,
            [nameToFill]: e.value,
            [nameToErase]: ""
        }))
        console.log(addFields);
    }
    const handleChange = (e: any) => {
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
        console.log(addFields);

    }
    const toggleAddModal = () => setAddModal(!addModal)
    const toggleDeleteModal = () => setDeleteModal(!deleteModal)

    const handleDelete = (item: any) => {
        setItemSelected(item)
        toggleDeleteModal()
    }
    const postRequest = async () => {
        //TODO : Validate non-empty inputs
        const nameField = addFields.name.split(" ")
        for (let i = 0; i < nameField.length; i++) {
            nameField[i] = nameField[i].charAt(0).toUpperCase() + nameField[i].slice(1);
        }
        const name = nameField.join(" ")
        let familyId
        if (addFields.familySurname === "" && addFields.familyId !== 0) {
            familyId = addFields.familyId
        }
        else {
            const surnameField = addFields.familySurname.split(" ")
            for (let i = 0; i < surnameField.length; i++) {
                surnameField[i] = surnameField[i].charAt(0).toUpperCase() + surnameField[i].slice(1);
            }
            const surname = surnameField.join(" ")
            console.log(surname)
            addFamily(surname)
            const families: any = await getAllFamilies()
            familyId = families.at(-1).id
        }
        const janijToAdd = {
            groupId: addFields.groupId,
            name,
            leadersCourse: addFields.leadersCourse,
            familyId
        }
        console.log(janijToAdd)
        addJanij(janijToAdd)
        toggleAddModal()
        refresh()
    }
    const deleteRequest = (id: number) => {
        console.log(id)
        deleteJanij(id)
        toggleDeleteModal()
        refresh()
    }
    const refresh = () => {
        fetchData()
    }
    async function fetchData() {
        setLoaded(false)
        setJanijim(await getAllJanijim())
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
                <Modal isOpen={addModal} toggle={toggleAddModal} ><AddJanijBody title='Agregar' toggler={toggleAddModal} /*familyOption={handleFamilyOption}*/ change={handleChange} changeFamily={changeFamily} action={postRequest} /></Modal>
            </div>
            <div className="justify-content-center table-content mx-3 w-95">

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
                                        <button type="button" className="btn btn-danger" ><i className=" fas fa-edit"></i></button>
                                        <button type='button' className="btn btn-danger" onClick={() => handleDelete({ id: janij.id, name: `${janij.name} ${janij.familySurname}` })} ><i className="fas fa-trash"></i></button></span>
                                </td>
                            </tr>
                        )
                        )}
                    </tbody>
                    <Modal isOpen={deleteModal} toggle={toggleDeleteModal} ><DeleteBody title='Eliminar Janij' toggler={toggleDeleteModal} itemSelected={itemSelected} function={deleteRequest} /></Modal>
                </table> :
                    <div className="text-center">
                        <h2>Cargando Lista de Janijim...</h2>
                        <div className="spinner-border text-danger mx-auto my-3" role="status">
                        </div>
                    </div>
                }
            </div>
        </main>
    );
}