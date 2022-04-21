import { withAuthenticationRequired } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PriceDTO } from '../dtos/PriceDTO';
import { getAllPricesByMonth } from '../services/priceService';
import Loading from './misc/Loading';

function PricesByMonth() {
    let { month } = useParams();
    const [pricesByMonth, setPricesByMonth] = useState<PriceDTO[]>([])

    useEffect(() => {
        const fetchData = async () => {
            setPricesByMonth(await getAllPricesByMonth(month!))
        }
        fetchData()
        console.log(pricesByMonth)
    },[])

    return (
        <main>
            <div className="main-container row justify-content-center text-center">
                {month &&
                    <h3>Precios de {new Date(Number(month.split("-")[0]), Number(month.split("-")[1]) - 1, 1).toLocaleDateString('default', { month: 'long' })} {month.split("-")[0]}</h3>
                }
            </div>
        </main>
    );
}

export default withAuthenticationRequired(PricesByMonth, {
    onRedirecting: () => <Loading />,
});