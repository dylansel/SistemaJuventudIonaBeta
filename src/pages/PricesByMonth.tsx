import { withAuthenticationRequired } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Spinner } from 'reactstrap';
import CaseCombinationDTO from '../dtos/CaseCombinationDTO';
import { PriceDTO } from '../dtos/PriceDTO';
import { getAllPricesByMonth } from '../services/priceService';
import { getCaseCombinations } from '../services/pricingCaseService';
import Loading from './misc/Loading';

function PricesByMonth() {
    let { month } = useParams();
    const [pricesByMonth, setPricesByMonth] = useState<PriceDTO[]>([])
    const [pricesLoaded, setPricesLoaded] = useState<boolean>(false)
    const [caseCombinations, setCaseCombinations] = useState<CaseCombinationDTO[]>([])
    const [isSaving, setIsSaving] = useState<boolean>(false)

    const handleSavePrices = () => {
        setIsSaving(true)
        //TODO: Save
        setIsSaving(false)
    }
    const countRepeated = (array: any[], elemento: any) => {
        let cant = 0;
        for (let i = 0; i < array.length; i++) {
            if (array[i] == elemento) {
                cant++;
            }
        }
        return cant;
    }
    const listCaseNames = (caseNamesE: any[]) => {
        let caseNames: any = []
        caseNamesE.map((e) => caseNames.push(e.name))
        let result: any = new Set(caseNames)
        let caseNamesLimpio: any[] = [...result]

        for (let i = 0; i < caseNamesLimpio.length; i++) {
            let cant = countRepeated(caseNames, caseNamesLimpio[i])
            caseNamesLimpio[i] = caseNamesLimpio[i] + ((cant > 1) ? ` X ${cant}` : ``);
        }
        return caseNamesLimpio
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

    let i = 0

    return (
        <main>
            {month &&
                <div className="main-container row justify-content-center text-center">
                    <h2 className='pb-3'>{new Date(Number(month.split("-")[0]), Number(month.split("-")[1]) - 1, 1).toLocaleDateString('default', { month: 'long' })} {month.split("-")[0]}</h2>
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
                                        {caseCombinations.map((caseCombination: CaseCombinationDTO, index) => {
                                            { i++ }
                                            return <div key={index} className="accordion-item col-md-8 col-10 d-inline-block pb-3">
                                                <p>Combinación # {i}</p>
                                                {listCaseNames(caseCombination.pricingCases).map((element: string) =>
                                                    <p>{element}</p>
                                                )}

                                                <h2 className="accordion-header" id="headingOne">
                                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${i}`} aria-expanded="false" aria-controls={`#collapse${i}`}>
                                                        Familias relacionadas ({caseCombination.families.length})
                                                    </button>
                                                </h2>
                                                <div id={`collapse${i}`} className="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#caseCombinations">
                                                    <div className="accordion-body">
                                                        {listFamilyToString(caseCombination.families)}
                                                    </div>
                                                </div>
                                                <div className="input-group flex-nowrap">
                                                    <span className="input-group-text" id="addon-wrapping">Precio $</span>
                                                    <input type="number" id={`priceCase${i}`} name={`priceCase${i}`} className="form-control" placeholder="3000" aria-label="Username" aria-describedby="addon-wrapping" />
                                                </div>

                                            </div>
                                        })}
                                    </div>

                                    <Button
                                        onClick={handleSavePrices}
                                        className='my-3 col-md-2 col-6'
                                        color={isSaving ? 'success' : 'danger'}
                                        disabled={isSaving}
                                        type='button'
                                    >
                                        {isSaving ? <>Grabando...<Spinner animation="border" variant="light" size="sm" /></> : 'Grabar Precios'}
                                    </Button>
                                </> :
                                <Loading />
                    }
                </div>
            }
        </main >
    );
}

export default withAuthenticationRequired(PricesByMonth, {
    onRedirecting: () => <Loading />,
});