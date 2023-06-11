import React, { useState, useEffect } from 'react'
import { Alert, Button, FormGroup, Input, Label, Modal, Spinner } from 'reactstrap';
import Scroll from '../components/UI/Layout/Scroll';
import AddJanijBody from "../components/UI/Modals/Janijim/AddJanijBody";
import DeleteBody from '../components/UI/Modals/DeleteBody';
import { deleteJanij, getAllJanijim, switchActiveJanij } from '../services/janijService';
import EditJanijBody from '../components/UI/Modals/Janijim/EditJanijBody';
import Loading from './misc/Loading';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import SkeletonRows from './misc/SkeletonRows';
import { getErrorByMessage } from '../utils/misc/errors';
import { filterActive } from '../utils/misc/filter';
import JanijListDTO from '../dtos/JanijListDTO';


function Janijim() {
    const [janijim, setJanijim] = useState<JanijListDTO[]>([])
    const [error, setError] = useState("")
    const [loaded, setLoaded] = useState(false)
    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [itemSelected, setItemSelected] = useState({
        name: "",
    })
    const [avisoAlert, setAvisoAlert] = useState({show:false,message:"",status:"warning",extraMessage:null})

    const toggleAddModal = () => setAddModal(!addModal)
    const toggleEditModal = (item?: any) => {
        setItemSelected(item)
        setEditModal(!editModal)
    }
    const handleAvisoAlert = (props:any) =>{
        setAvisoAlert({...avisoAlert,...props})
    }


    const toggleDeleteModal = () => setDeleteModal(!deleteModal)

    const handleDelete = (item: any) => {
        setItemSelected(item)
        toggleDeleteModal()
    }

    const [tableFilter, setTableFilter] = useState("Activos")
    const [searchFilter, setSearchFilter] = useState("")
    const handleTableFilter = (e: any) => {
        if (e.target.name === "viewFilter") {
            setTableFilter(e.target.value);
        }  
        if (e.target.name === "searchFilter") {
            setSearchFilter(e.target.value);
        }

    }
    const findJanij = (janijInput: string) => {
        if (janijInput === "") return janijim;
      
        return janijim.filter((janij: JanijListDTO) => (
          janij.name.split(" ")[0]?.toLowerCase().startsWith(janijInput.toLowerCase()) ||
          janij.name.split(" ")[1]?.toLowerCase().startsWith(janijInput.toLowerCase()) ||
          `${janij.name.split(" ")[0]?.toLowerCase()} ${janij.name.split(" ")[1]?.toLowerCase()}`.startsWith(janijInput.toLowerCase()) || 
          janij.group.split(" ")[1]?.toLowerCase().startsWith(janijInput.toLowerCase()) 
        ));
      };

    const refresh = () => {
        fetchData()
    }
    async function fetchData() {
        setError("")
        setSearchFilter("")
        setLoaded(false)
        try {
            const janijim = await getAllJanijim(tableFilter=="Activos")
            setJanijim(janijim)
        }
        catch (error: any) {
            setError(error.message)
        }
        setLoaded(true)
    }

    useEffect(() => {
        fetchData()
    }, [tableFilter]);

    return (
        <main>
            
            <div className="filters d-flex mx-2 align-items-center justify-content-end">
                <FormGroup className="viewFilter">
                <Input
                id="searchFilter"
                name="searchFilter"
                placeholder='Buscar Janij'
                type="text"
                disabled={!loaded}
                hidden={!loaded}
                width={"20%"}
                autoComplete='off'
                onChange={handleTableFilter}
                value={searchFilter}
                />
                </FormGroup>
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
                    <>
                        <option>Activos</option>
                        <option>Todos</option>
                    </>
                        
                    </Input>
                </FormGroup>
                
                <Button color='danger' title='Actualizar' onClick={refresh} type='button' className="mx-3"><i className="fa fa-refresh"></i></Button>
                <Button onClick={toggleAddModal} color='danger' type='button'>Agregar Janij</Button>
                <Modal isOpen={addModal} toggle={toggleAddModal} ><AddJanijBody title='Agregar' toggle={toggleAddModal} refresh={refresh} avisoAlert={handleAvisoAlert}/></Modal>
                <Modal isOpen={editModal} toggle={toggleEditModal} ><EditJanijBody title='Editar' refresh={refresh} toggle={toggleEditModal} item={itemSelected} /></Modal>
                
                
               

            </div>
            <div className="justify-content-center table-content mx-3 mt-4">

                {error === "" ?
                    <table className={`table ${loaded && 'table-hover'} table-responsive`}>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre y Apellido</th>
                                <th scope="col">Grupo</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!loaded && <SkeletonRows rows={50} columns={4} />}
                            {loaded &&
                                findJanij(searchFilter)
                                    .map((janij: JanijListDTO, index: number) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{`${janij.name} `}</td>
                                            <td>{janij.group.split(' ')[1]}</td>
                                            <td>
                                                <span className="actions d-flex">
                                                    <button type="button" title='Editar' className="btn btn-danger" onClick={() => toggleEditModal({ name: janij.name })}><i className=" fas fa-edit"></i></button>
                                                    {/* <button type="button" title={janij.active ? 'Desactivar' : 'Activar'} className="btn btn-danger" onClick={() => handleActive({ id: janij.id, active: !janij.active })}><i className={`fas ${janij.active ? 'fa-eye-slash' : 'fa-eye'}`}></i></button> */}
                                                    <button type='button' title='Eliminar' className="btn btn-danger" onClick={() => handleDelete({ id:janij.name, name: janij.name})} ><i className="fas fa-trash"></i></button>
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                    )}
                        </tbody>
                        <Modal isOpen={deleteModal} toggle={toggleDeleteModal} ><DeleteBody title='Eliminar Janij' refresh={refresh} toggle={toggleDeleteModal} item={itemSelected} delete={deleteJanij} /></Modal>
                    </table>
                    :
                    <div className="text-center">
                        <h3>{getErrorByMessage(error)}</h3>
                    </div>
                }
            </div>
            <Scroll showBelow={250} />
            {(avisoAlert.show)?
            <Alert
            bsStyle="info"
            className={`text-center position-fixed bottom-0 alert-${(avisoAlert.status)}`}
            style={{  left: '50%', transform: 'translateX(-50%)',zIndex:"1000"}}
                >
                {(avisoAlert.extraMessage)?
                <>
                <p>{avisoAlert.message} {avisoAlert.extraMessage}</p>
                
                </> 
                :<p>{avisoAlert.message}</p>}
            </Alert>
            :""}
        </main>
    );
}

export default withAuthenticationRequired(Janijim, {
    onRedirecting: () => <Loading />,
});
