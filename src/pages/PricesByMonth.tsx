import { withAuthenticationRequired } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Spinner } from 'reactstrap';
import Scroll from '../components/UI/Layout/Scroll';
import DialogBox from '../components/UI/Modals/DialogBox';
import { useCallbackPrompt } from '../customHooks/useCallbackPrompts';
import CaseCombinationDTO from '../dtos/CaseCombinationDTO';
import { PriceDTO } from '../dtos/PriceDTO';
import { PriceRequestDTO } from '../dtos/PriceRequestDTO';
import PricingCaseDTO from '../dtos/PricingCaseDTO';
import { getAllPricesByMonth } from '../services/priceService';
import { getCaseCombinations } from '../services/pricingCaseService';
import Loading from './misc/Loading';

function PricesByMonth() {
    let { month } = useParams();
    const [pricesByMonth, setPricesByMonth] = useState<PriceDTO[]>([])
    const [pricesLoaded, setPricesLoaded] = useState<boolean>(false)
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false)
    const [caseCombinations, setCaseCombinations] = useState<any[]>([])
    const [completedAllPrices, setCompletedAllPrices] = useState<boolean>(false)
    const [isSaving, setIsSaving] = useState<boolean>(false)

    const [showDialog, setShowDialog] = useState(false)
    const [showPrompt, confirmNavigation, cancelNavigation] =
        useCallbackPrompt(showDialog)

    const handleChange = (e: any, caseCombinationId: number) => {
        console.log(caseCombinationId)
        setHasUnsavedChanges(true)
    }

    const listCaseNames = (pricingCases: PricingCaseDTO[]) => {
        let groupPricingCases: any = {}
        pricingCases.forEach((pricingCase: PricingCaseDTO) => {
            if (!groupPricingCases[pricingCase.name]) {
                groupPricingCases[pricingCase.name] = 0
            }
            groupPricingCases[pricingCase.name]++
        })
        let result: string = ""
        const keysLength: number = Object.keys(groupPricingCases).length
        let i = 0
        for (const pricingCase in groupPricingCases) {
            i++
            result += (i === keysLength && keysLength > 1 ? " y " : "") + pricingCase + " x" + groupPricingCases[pricingCase] + (i < keysLength - 1 ? ", " : "")
        }
        return result
    }
    const listFamilyToString = (families: string[]) => {
        let string = "";
        for (let family in families) {
            family = family[0].toUpperCase() + family.slice(1);
        }
        families.sort();
        families.map((n, i) => string += n + ((i !== families.length - 1) ? " | " : ""))
        return string
    }

    const handleSavePrices = () => {
        setIsSaving(true)
        //TODO: Save
        setHasUnsavedChanges(false)
        setIsSaving(false)
    }

    useEffect(() => {
        const fetchData = async () => {
            setPricesByMonth(await getAllPricesByMonth(month!))
            if (pricesByMonth.length > 0) {
                setPricesLoaded(true)
            }
            else {
                setCaseCombinations(await getCaseCombinations())
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        setShowDialog(hasUnsavedChanges)
    }, [hasUnsavedChanges])

    let i = 0

    return (
        <main>
            {month &&
                <div className="main-container row justify-content-center text-center">
                    <h2 className='pb-3'>Precios de {new Date(Number(month.split("-")[0]), Number(month.split("-")[1]) - 1, 1).toLocaleDateString('default', { month: 'long' })} {month.split("-")[0]}</h2>
                    {
                        pricesLoaded ?
                            <>
                                <h3>Precios</h3>
                                {
                                    pricesByMonth.map((price: PriceDTO) =>
                                        <p>Precio: {price.amount}</p>
                                    )
                                }
                            </>
                            :

                            caseCombinations.length > 0 ?
                                <>
                                    <div className="accordion" id="caseCombinations">
                                        {caseCombinations.map((caseCombination, index) => {
                                            i++
                                            caseCombination.id = i
                                            return <div key={index} className="accordion-item col-md-8 col-10 d-inline-block p-3">
                                                <div className='col-10 d-inline-block'>
                                                    <p>Combinación # {i}</p>
                                                    <p className='fw-bold'>{listCaseNames(caseCombination.pricingCases)}</p>

                                                    <h2 className="accordion-header" id="headingOne">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${i}`} aria-expanded="false" aria-controls={`#collapse${i}`}>
                                                            Familias relacionadas ({caseCombination.families.length})
                                                        </button>
                                                    </h2>
                                                    <div id={`collapse${i}`} className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#caseCombinations">
                                                        <div className="accordion-body">
                                                            {listFamilyToString(caseCombination.families)}
                                                        </div>
                                                    </div>
                                                    <div className="d-inline-block col-md-6 mt-3">
                                                        <div className="input-group flex-nowrap">
                                                            <span className="input-group-text" id="addon-wrapping">Precio $</span>
                                                            <input type="number" id={`priceCase${i}`} name={`priceCase${i}`} onChange={(e) => handleChange(e, caseCombination.id)} className="form-control" placeholder="3000" aria-label="Username" aria-describedby="addon-wrapping" />
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
                showDialog={showPrompt}
                confirmNavigation={confirmNavigation}
                cancelNavigation={cancelNavigation}
            />
            <Scroll showBelow={250} />
        </main >
    );
}

export default withAuthenticationRequired(PricesByMonth, {
    onRedirecting: () => <Loading />,
});