import { withAuthenticationRequired } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Button, Modal} from "reactstrap";
import Scroll from "../components/UI/Layout/Scroll";
import AddSpecialPricesBody from "../components/UI/Modals/SpecialPrice/AddSpecialPricesBody";
import EditSpecialPriceBody from "../components/UI/Modals/SpecialPrice/EditSpecialPricesBody";
import DeleteBody from "../components/UI/Modals/DeleteBody";
import Loading from "./misc/Loading";
import SkeletonRows from "./misc/SkeletonRows";
import SpecialPriceDTO from "../dtos/SpecialPriceDTO";
import { getAllSpecialPrice,deleteSpecialPrice } from "../services/specialPriceService";

function SpecialPrices() {
    const [specialPrice, setSpecialPrice] = useState<SpecialPriceDTO[]>([])
    const [loaded, setLoaded] = useState(false)
    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [itemSelected, setItemSelected] = useState({
        id: 0,
        name: ""
    })

    const toggleAddModal = () => setAddModal(!addModal)
    const toggleEditModal = (item?: any) => {
        setItemSelected(item)
        setEditModal(!editModal)
    }

    const toggleDeleteModal = () => setDeleteModal(!deleteModal)

    const handleDelete = (item: any) => {
        const fItem = {
            id:item.id,
            name: item.name[0].family.surname
        } 
        setItemSelected(fItem)
        toggleDeleteModal()
    }
    
    const refresh = () => {
        fetchData()
    }
    async function fetchData() {
        setLoaded(false)
        setSpecialPrice(await getAllSpecialPrice("sort=month,desc"))
        setLoaded(true)
    }

    let i = 0

    useEffect(() => {
        refresh()
    }, []);
    return (
        <main>
            <div className="filters d-flex mx-4 align-items-center justify-content-end">
                <Button color='danger' title='Actualizar' onClick={refresh} type='button' className="mx-3"><i className="fa fa-refresh"></i></Button>
                <Button onClick={toggleAddModal} color='danger' type='button'>Agregar Precio Especial</Button>
                <Modal isOpen={addModal} toggle={toggleAddModal} ><AddSpecialPricesBody title='Agregar' refresh={refresh} toggle={toggleAddModal} /></Modal>
                <Modal isOpen={editModal} toggle={toggleEditModal} ><EditSpecialPriceBody title='Editar' refresh={refresh} toggle={toggleEditModal} item={itemSelected} /></Modal>
            </div>
            <div className="justify-content-center table-content mx-3 mt-4">

                <table className={`table ${loaded && 'table-hover'} table-responsive`}>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Familia</th>
                            <th scope="col">Mes</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loaded && <SkeletonRows rows={50} columns={5} />}
                        {loaded && specialPrice
                            .map((specialP: SpecialPriceDTO) => (
                                <tr key={specialP.id} >
                                    <td>{++i}</td>
                                    <td className="w-50">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${specialP.id}`} aria-expanded="false" >{specialP.payments[0].family.surname}</button>
                                        <div className="collapse" id={`collapse${specialP.id}`}>
                                            <div className="card card-body">
                                                {specialP.payments[0].family.janijim.map(janij => (
                                                    <p>{janij.name}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </td>
                                    <td> {new Date(Number(specialP.month.split("-")[0]),Number(specialP.month.split("-")[1])-1 , 1).toLocaleDateString('default', { month: 'long', year: 'numeric' })}</td>
                                    <td>${specialP.amount}</td>
                                    <td>
                                        <span className="actions d-flex">
                                            <button type="button" title='Editar' className="btn btn-danger" onClick={() => toggleEditModal({ id: specialP.id })}><i className=" fas fa-edit"></i></button>
                                            <button type='button' className="btn btn-danger" onClick={() => handleDelete({ id: specialP.id, name: specialP.payments })} ><i className="fas fa-trash"></i></button>
                                        </span>
                                    </td>
                                </tr>
                            )
                            )}
                    </tbody>
                    <Modal isOpen={deleteModal} toggle={toggleDeleteModal} ><DeleteBody title='Eliminar Precio Especial' refresh={refresh} toggle={toggleDeleteModal} item={itemSelected} delete={deleteSpecialPrice} /></Modal>
                </table>
            </div>
            <Scroll showBelow={250} />
        </main >
    );
}

export default withAuthenticationRequired(SpecialPrices, {
    onRedirecting: () => <Loading />,
});