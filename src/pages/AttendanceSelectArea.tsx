import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from './misc/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import JanijDTO from '../dtos/JanijDTO';
import { getAllJanijim } from '../services/janijService';
import { Button, Spinner } from 'reactstrap';
import Scroll from '../components/UI/Layout/Scroll';
import ActivityDTO from '../dtos/ActivityDTO';
import { getActivityById } from '../services/activityService';
import { dateToEsString } from '../utils/misc/strings';
import AreaDTO from '../dtos/AreaDTO';
import { getAllAreas } from '../services/areaService';

function AttendanceSelectArea() {
    const history = useNavigate();
    let { activityId } = useParams();

    const [janijim, setJanijim] = useState<JanijDTO[]>([])
    const [activityData, setActivityData] = useState<ActivityDTO>()
    const [areas, setAreas] = useState<AreaDTO[]>()
    const [loaded, setLoaded] = useState(false)

    const loadAttendance = (activityId: number, areaId: number) => {
        history(`/attendance/${activityId}/${areaId}`)
    }

    const refresh = () => {
        fetchData()
    }
    async function fetchData() {
        setLoaded(false)
        setAreas(await getAllAreas("sort=ordinal,asc"))
        setJanijim(await getAllJanijim("sort=group.ordinal,asc;firstName,asc;family.surname,asc"))
        setActivityData(await getActivityById(parseInt(activityId!)))
        setLoaded(true)
    }

    useEffect(() => {
        refresh()
    }, []);

    return (
        <main>
            <div className="filters mx-4 align-items-center justify-content-center">
                {loaded && <>
                    <div className="d-flex justify-content-center mb-4">
                        <button type="button" title='Volver' className="btn btn-danger mx-5" onClick={() => history(-1)}><i className=" fas fa-arrow-left"></i></button>
                        <h4>{loaded && dateToEsString(activityData?.date!)} </h4>
                    </div>
                    <div className="d-flex col-12 justify-content-center text-center">
                        Buscador
                    </div>
                </>}
            </div>

            <div className="justify-content-center table-content mx-3 mt-4 text-center">
                {loaded ?
                    <>
                        {areas &&
                            areas.map((area: AreaDTO) => {
                                <Button title={area.name} onClick={() => loadAttendance(activityData?.id!, area.id)}>{area.name}</Button>
                            })
                        }
                    </>
                    :
                    <div className="text-center">
                        <h2>Cargando...</h2>
                        <Spinner animation="border" className='text-danger my-2' variant="light" />
                    </div>
                }
            </div>
            <Scroll showBelow={250} />
        </main >
    );
}

export default withAuthenticationRequired(AttendanceSelectArea, {
    onRedirecting: () => <Loading />,
});