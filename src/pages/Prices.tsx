import { withAuthenticationRequired } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Modal, Spinner } from 'reactstrap';
import Scroll from '../components/UI/Layout/Scroll';
import DialogBox from '../components/UI/Modals/DialogBox';
import EditPriceBody from '../components/UI/Modals/Prices/EditPriceBody';
import { useCallbackPrompt } from '../customHooks/useCallbackPrompts';
import PriceDTO, { PricingCasePriceDTO } from '../dtos/PriceDTO';
import { PriceRequestDTO } from '../dtos/PriceRequestDTO';
import { PricingCaseDTO } from '../dtos/CaseCombinationDTO';
import { addAllPrices, deletePricesByMonth, getAllPricesByMonth } from '../services/priceService';
import { getCaseCombinations } from '../services/pricingCaseService';
import Loading from './misc/Loading';
import SkeletonRows from './misc/SkeletonRows';
import { listArrToString } from '../utils/misc/strings'
import {formatDateToEsYearMonth} from '../utils/misc/dates'
function Prices() {
    const history = useNavigate();
    let { month } = useParams();
    const [pricesByMonth, setPricesByMonth] = useState<PriceDTO[]>([])
    const [pricesLoaded, setPricesLoaded] = useState<boolean>(false)
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false)
    const [caseCombinations, setCaseCombinations] = useState<any[]>([])
    const [pricesToAdd, setPricesToAdd] = useState<PriceRequestDTO[]>([])
    const [completedAllPrices, setCompletedAllPrices] = useState<boolean>(false)
    const [isSaving, setIsSaving] = useState<boolean>(false)
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const [editModal, setEditModal] = useState<boolean>(false)
    const [itemSelected, setItemSelected] = useState<number>(-1)


    const [showDialog, setShowDialog] = useState(false)
    const [showPrompt, confirmNavigation, cancelNavigation] =
        useCallbackPrompt(showDialog)

    const handleChange = (e: any, caseCombinationId: number, pricingCases: PricingCaseDTO[]) => {
        setHasUnsavedChanges(true)
        const newPrice = {
            month: month!,
            amount: e.target.value,
            pricingCases: pricingCases.map((pricingCase: PricingCaseDTO) => pricingCase.id)
        }
        pricesToAdd[caseCombinationId] = newPrice
        setCompletedAllPrices(pricesToAdd.filter(price => price.amount > 0).length === caseCombinations.length)
    }

    const toggleEditModal = (id?: any) => {
        setItemSelected(id!)
        setEditModal(!editModal)
    }

    const getCountByCasePrice = (groupPricingCases: any) => {
        let result: string = ""
        const keysLength: number = Object.keys(groupPricingCases).length
        let i = 0
        for (const pricingCase in groupPricingCases) {
            i++
            result += (i === keysLength && keysLength > 1 ? " y " : "") + pricingCase + " x" + groupPricingCases[pricingCase] + (i < keysLength - 1 ? ", " : "")
        }
        return result
    }

    const listPricingCasePrices = (pricingCases: PricingCasePriceDTO[]) => {
        let groupPricingCases: any = {}
        pricingCases.forEach((pricingCase: PricingCasePriceDTO) => {
            if (!groupPricingCases[pricingCase.pricingCase.name]) {
                groupPricingCases[pricingCase.pricingCase.name] = 0
            }
            groupPricingCases[pricingCase.pricingCase.name]++
        })
        return getCountByCasePrice(groupPricingCases)
    }

    const listCaseNames = (pricingCases: PricingCaseDTO[]) => {
        let groupPricingCases: any = {}
        pricingCases.forEach((pricingCase: PricingCaseDTO) => {
            if (!groupPricingCases[pricingCase.name]) {
                groupPricingCases[pricingCase.name] = 0
            }
            groupPricingCases[pricingCase.name]++
        })
        return getCountByCasePrice(groupPricingCases)
    }


    const handleSavePrices = async () => {
        setIsSaving(true)
        await addAllPrices(pricesToAdd)
        setHasUnsavedChanges(false)
        setIsSaving(false)
        fetchData()
    }

    const handleDeleteAllPrices = async () => {
        setIsDeleting(true)
        setTimeout(async () => {
            await deletePricesByMonth(pricesByMonth)
            setIsDeleting(false)
            setPricesByMonth([])
            fetchData()
        }, 1500);
    }

    const fetchData = async () => {
        setPricesLoaded(false)
        setPricesByMonth([])
        const data = await getAllPricesByMonth(month!)
        if (data.length > 0) {
            setPricesByMonth(data)
            setPricesLoaded(true)
        }
        else {
            setCaseCombinations(await getCaseCombinations())
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        setShowDialog(hasUnsavedChanges)
    }, [hasUnsavedChanges])

    return (
        <main>
            {month &&
                <div className="main-container row justify-content-center text-center">
                    <div className="d-flex align-items-center justify-content-center mb-4">
                        <button type="button" title='Volver' className="btn btn-danger mx-3" onClick={() => history('/prices')}><i className=" fas fa-arrow-left"></i></button>
                        <h3>Precios de {formatDateToEsYearMonth(month,"")}</h3>
                    </div>
                    {
                        pricesLoaded ?
                            <>
                                <div className="justify-content-center table-content mx-3 mt-4 col-10">

                                    <table className={`table ${pricesLoaded && 'table-hover'} table-responsive`}>
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Combinación</th>
                                                <th scope="col">Precio</th>
                                                <th scope="col">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {!pricesLoaded && <SkeletonRows rows={50} columns={3} />}
                                            {pricesLoaded &&
                                                pricesByMonth
                                                    .map((price: PriceDTO, index: number) => (
                                                        <tr key={price.id}>
                                                            <td>{index + 1}</td>
                                                            <td className="w-50">
                                                                {listPricingCasePrices(price.pricingCasePrices!)}
                                                            </td>
                                                            <td><p className='fw-bold'>${price.amount}</p></td>
                                                            <td>
                                                                <span className="actions d-flex justify-content-center">
                                                                    <button type="button" title='Editar' className="btn btn-danger" onClick={() => toggleEditModal({ id: price.id })}><i className=" fas fa-edit"></i></button>
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    )
                                                    )}
                                        </tbody>
                                        <Modal isOpen={editModal} toggle={toggleEditModal}><EditPriceBody title='Editar' refresh={fetchData} toggle={toggleEditModal} item={itemSelected} /></Modal>
                                    </table>
                                </div>
                                <Button
                                    onClick={handleDeleteAllPrices}
                                    className='my-3 col-md-2 col-6'
                                    color={isDeleting ? 'success' : 'danger'}
                                    disabled={isDeleting}
                                    hidden={new Date(Number(month.split("-")[0]), Number(month.split("-")[1]) - 1, 1) <= new Date()}
                                    type='button'
                                >
                                    {isDeleting ? <>Eliminando...<Spinner animation="border" variant="light" size="sm" /></> : 'Eliminar Precios'}
                                </Button>
                            </>
                            :

                            caseCombinations.length > 0 ?
                                <>
                                    <div className="accordion" id="caseCombinations">
                                        {caseCombinations.map((caseCombination, index) => {
                                            caseCombination.id = index
                                            return <div key={index} className="accordion-item col-md-8 col-10 d-inline-block p-3">
                                                <div className='col-10 d-inline-block'>
                                                    <p>Combinación # {index + 1}</p>
                                                    <p className='fw-bold'>{listCaseNames(caseCombination.pricingCases)}</p>

                                                    <h2 className="accordion-header" id="headingOne">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index + 1}`} aria-expanded="false" aria-controls={`#collapse${index + 1}`}>
                                                            Familias relacionadas ({caseCombination.families.length})
                                                        </button>
                                                    </h2>
                                                    <div id={`collapse${index + 1}`} className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#caseCombinations">
                                                        <div className="accordion-body">
                                                            {listArrToString(caseCombination.families, " | ")}
                                                        </div>
                                                    </div>
                                                    <div className="d-inline-block col-md-6 mt-3">
                                                        <div className="input-group flex-nowrap">
                                                            <span className="input-group-text" id="addon-wrapping">Precio $</span>
                                                            <input type="number" id={`priceCase${index + 1}`} name={`priceCase${index + 1}`} onChange={(e) => handleChange(e, caseCombination.id, caseCombination.pricingCases)} className="form-control" placeholder="3000" aria-label="Username" aria-describedby="addon-wrapping" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        })}
                                    </div>

                                    <Button
                                        onClick={handleSavePrices}
                                        className='my-3 col-md-2 col-6'
                                        color={isSaving ? 'success' : 'danger'}
                                        disabled={isSaving || !completedAllPrices}
                                        type='button'
                                    >
                                        {isSaving ? <>Grabando...<Spinner animation="border" variant="light" size="sm" /></> : 'Grabar Precios'}
                                    </Button>
                                </> :
                                <Loading />
                    }
                </div>
            }
            <DialogBox
                title='Alerta'
                text='¿Estás seguro que deseas salir? Hay cambios sin guardar.'
                showDialog={showPrompt}
                confirmNavigation={confirmNavigation}
                cancelNavigation={cancelNavigation}
            />
            <Scroll showBelow={250} />
        </main >
    );
}

export default withAuthenticationRequired(Prices, {
    onRedirecting: () => <Loading />,
});