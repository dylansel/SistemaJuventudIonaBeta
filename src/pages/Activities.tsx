import React, { useState, useEffect } from 'react'
import { Button, Modal, Spinner } from 'reactstrap';
import Scroll from '../components/UI/Layout/Scroll';
import AddActivityBody from "../components/UI/Modals/Activities/AddActivityBody";
import AddMultipleActivitiesBody from "../components/UI/Modals/Activities/AddMultipleActivitiesBody";
import DeleteBody from '../components/UI/Modals/DeleteBody';
import { deleteActivity, getAllActivities } from '../services/activityService';
import EditActivityBody from '../components/UI/Modals/Activities/EditActivityBody';
import Loading from './misc/Loading';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { formatDateUsToEs } from "../utils/misc/strings";
import SkeletonRows from './misc/SkeletonRows';

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

    const refresh = () => {
        fetchData()
    }
    async function fetchData() {
        setLoaded(false)
        setActivity(await getAllActivities("sort=date,desc"))
        setLoaded(true)
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <main>
            <div className="filters d-flex mx-4 align-items-center justify-content-end">

                <Button color='danger' title='Actualizar' onClick={refresh} type='button' className="mx-3"><i className="fa fa-refresh"></i></Button>
                <Button onClick={toggleAddModal} color='danger' type='button'>Agregar Actividad</Button>
                <Button onClick={toggleAddMultipleModal} className="mx-3" color='danger' type='button'>Carga Masiva de Actividades</Button>
                <Modal isOpen={addModal} toggle={toggleAddModal} ><AddActivityBody title='Agregar' toggle={toggleAddModal} refresh={refresh} /></Modal>
                <Modal isOpen={addMultipleModal} toggle={toggleAddMultipleModal} ><AddMultipleActivitiesBody title='Cargar' toggle={toggleAddMultipleModal} refresh={refresh} /></Modal>
                <Modal isOpen={editModal} toggle={toggleEditModal} ><EditActivityBody title='Editar' refresh={refresh} toggle={toggleEditModal} item={itemSelected} /></Modal>

            </div>
            <div className="justify-content-center table-content mx-3 mt-4">

                <table className={`table ${loaded && 'table-hover'} table-responsive`}>
                    <thead>
                        <tr>
                            <th scope="col">Fecha</th>
                            <th scope="col">Precio Invididual</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loaded && <SkeletonRows />}
                        {loaded &&
                            activity
                                .map(activity => (
                                    <tr key={activity.id} >
                                        <td>{`${formatDateUsToEs(activity.date)}`}</td>
                                        <td>{`$${activity.individualPrice}`}</td>
                                        <td>
                                            <span className="actions d-flex">
                                                <button type="button" title='Editar' className="btn btn-danger" onClick={() => toggleEditModal({ id: activity.id })}><i className="fas fa-edit"></i></button>
                                                <button type='button' title='Eliminar' className="btn btn-danger" onClick={() => handleDelete({ id: activity.id, name: `${activity.date}` })} ><i className="fas fa-trash"></i></button>
                                            </span>
                                        </td>
                                    </tr>
                                )
                                )}
                    </tbody>
                    <Modal isOpen={deleteModal} toggle={toggleDeleteModal} ><DeleteBody title='Eliminar Actividad' refresh={refresh} toggle={toggleDeleteModal} item={itemSelected} delete={deleteActivity} /></Modal>
                </table>
            </div>
            <Scroll showBelow={250} />
        </main>
    );

}

export default withAuthenticationRequired(Activities, {
    onRedirecting: () => <Loading />,
});