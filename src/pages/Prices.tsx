import { withAuthenticationRequired } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from 'reactstrap';
import Loading from './misc/Loading';

function Prices() {
    const history = useNavigate();
    const [years, setYears] = useState<number[]>([])
    const [months, setMonths] = useState<number[]>([])
    const [month, setMonth] = useState<string>("")
    const [year, setYear] = useState<string>("")
    const [loaded, setLoaded] = useState<boolean>(false)

    const loadNumbers = (from: number, to: number) => {
        let numbers = []
        for (let i = from; i <= to; i++) {
            numbers.push(i)
        }
        return numbers
    }

    const loadPrices = (year: string, month: string) => {
        if (month.length === 1) month = "0".concat(month)
        history(`/prices/${year}-${month}`)
    }

    useEffect(() => {
        setYears(loadNumbers(2000, (new Date()).getFullYear()))
        setMonths(loadNumbers(1, 12))
        setLoaded(true)
    }, [])

    return (
        <main>
            <div className="main-container row justify-content-center text-center">
                <h3 className="mb-5">Precios</h3>
                {loaded ? <>
                    <div className='col-md-2 col-6 justify-content-center'>
                        <p>Selecciona un año</p>
                        <Input
                            type='select'
                            name='year'
                            id='year'
                            className='my-4'
                            onChange={(e) => setYear(e.target.value)}
                            defaultValue={-1}
                        >
                            <option key="-1" value="-1" disabled >Elija un año</option>
                            {
                                years.map((year: number) =>
                                    <option value={year}>{year}</option>
                                )
                            }
                        </Input>
                        <p>Selecciona un mes</p>
                        <Input
                            type='select'
                            name='month'
                            id='month'
                            onChange={(e) => setMonth(e.target.value)}
                            defaultValue={-1}
                        >
                            <option key="-1" value="-1" disabled >Elija un mes</option>
                            {
                                months.map((month: number) =>
                                    <option value={month}>{month}</option>
                                )
                            }
                        </Input>
                        <button type="button" disabled={month === "" && year === ""} title='Cargar Precios' className="my-4 btn btn-danger col-4" onClick={() => loadPrices(year, month)}><i className=" fas fa-arrow-right"></i></button>
                    </div>
                </>
                    : <Loading />
                }
            </div>
        </main>
    );
}

export default withAuthenticationRequired(Prices, {
    onRedirecting: () => <Loading />,
});