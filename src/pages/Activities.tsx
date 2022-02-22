import React, { useState, useEffect } from 'react'
import { Button, FormGroup, Input, Label, Modal, Spinner } from 'reactstrap';
import Scroll from '../components/UI/Layout/Scroll';
import AddActivityBody from "../components/UI/Modals/Activity/AddActivityBody";
import AddMultipleActivitiesBody from "../components/UI/Modals/Activity/AddMultipleActivitiesBody";
import DeleteBody from '../components/UI/Modals/DeleteBody';
import {deleteActivity, getAllActivities} from '../services/activityService';
import EditActivityBody from '../components/UI/Modals/Activity/EditActivityBody';
import Loading from './misc/Loading';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { capitalizeAllWords, isEmptyOrSpaces,formatDateUsToEs } from "../utils/misc/strings";

function Activities() {
    const [activity, setActivity] = useState<any[]>([])
    const [loaded, setLoaded] = useState(false)
    const [addModal, setAddModal] = useState(false)
    const [addMultipleModal, setAddMultipleModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [itemSelected, setItemSelected] = useState({
        id: -1,
        date: "-1",
        individualPrice: -1
    })

    const toggleAddModal = () => setAddModal(!addModal)
    const toggleAddMultipleModal = () => setAddMultipleModal(!addMultipleModal)
    const toggleEditModal = (item?: any) => {
        setItemSelected(item)
        setEditModal(!editModal)
    }

    const toggleDeleteModal = () => setDeleteModal(!deleteModal)

    const handleDelete = (item: any) => {
        item.name = formatDateUsToEs(item.name)
        setItemSelected(item)
        toggleDeleteModal()
    }



    /*(borrar si no se hace) seccion filtro de suspension */
  

    const refresh = () => {
        fetchData()
    }
    async function fetchData() {
        setLoaded(false)
        setActivity(await getAllActivities("sort=date,desc"))
        setLoaded(true)
    }

    let i = 0

    useEffect(() => {
        fetchData()
    }, []);
    
    return (
        <main>
            <div className="filters d-flex mx-4 align-items-center justify-content-end">
            

                {/*(borrar si no se hace) seccion filtro de suspension */}
                  

                <Button color='danger' title='Actualizar' onClick={refresh} type='button' className="mx-3"><i className="fa fa-refresh"></i></Button>
                <Button onClick={toggleAddModal} color='danger' type='button'>Agregar Actividad</Button>
                <Button onClick={toggleAddMultipleModal} className="mx-3" color='danger' type='button'>Carga Masiva de Actividades</Button>
                <Modal isOpen={addModal} toggle={toggleAddModal} ><AddActivityBody title='Agregar' toggle={toggleAddModal} refresh={refresh} /></Modal>
                <Modal isOpen={addMultipleModal} toggle={toggleAddMultipleModal} ><AddMultipleActivitiesBody title='Cargar' toggle={toggleAddMultipleModal} refresh={refresh} /></Modal>
                <Modal isOpen={editModal} toggle={toggleEditModal} ><EditActivityBody title='Editar' refresh={refresh} toggle={toggleEditModal} item={itemSelected} /></Modal>
                
            </div>
            <div className="justify-content-center table-content mx-3 mt-4">

                {loaded ? <table className="table table-hover table-responsive">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Precio Invididual</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            activity
                                /*(borrar si no se hace) seccion filtro de suspension */   
                                .map(activity => (
                                    <tr key={activity.id} > {/*(borrar si no se hace) seccion color filtro de suspension */}
                                        <td>{++i}</td>
                                        <td>{`${formatDateUsToEs(activity.date)}`}</td>  {/*formatear la fecha en dd/mm/aaaa*/}
                                        <td>{`$${activity.individualPrice}`}</td>
                                        <td>
                                            <span className="actions d-flex">
                                                <button type="button" title='Editar' className="btn btn-danger" onClick={() => toggleEditModal({ id: activity.id })}><i className="fas fa-edit"></i></button>
                                                {/*(borrar si no se hace) seccion boton de suspension */}
                                                <button type='button' title='Eliminar' className="btn btn-danger" onClick={() => handleDelete({ id: activity.id, name: `${activity.date}` })} ><i className="fas fa-trash"></i></button>
                                            </span>
                                        </td>
                                    </tr>
                                )
                                )}
                    </tbody>
                    <Modal isOpen={deleteModal} toggle={toggleDeleteModal} ><DeleteBody title='Eliminar Actividad' refresh={refresh} toggle={toggleDeleteModal} item={itemSelected} delete={deleteActivity}/></Modal>
                </table>
                    :
                    <div className="text-center">
                        <h2>Cargando Lista de Actividades...</h2>
                        <Spinner animation="border" className='text-danger my-2' variant="light" />
                    </div>
                }
            </div>
            <Scroll showBelow={250}/>
        </main>
    );
    
}

export default withAuthenticationRequired(Activities, {
    onRedirecting: () => <Loading />,
});