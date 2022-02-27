import { withAuthenticationRequired } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
import Scroll from '../components/UI/Layout/Scroll';
import ActivityDTO from '../dtos/ActivityDTO';
import { getAllActivities } from '../services/activityService';
import Loading from './misc/Loading';
import { useNavigate } from 'react-router-dom';
import { dateToEsString } from '../utils/misc/strings';

function Attendance() {
    const history = useNavigate();
    const [activities, setActivities] = useState<ActivityDTO[]>([])
    const [loaded, setLoaded] = useState(false)
    const [today, setToday] = useState<ActivityDTO>()

    const loadAttendance = (id: number) => {
        history(`/attendance/${id}`)
    }

    const checkToday = () => {
        const todayDate = new Date().toISOString().split('T')[0]
        return activities.find((activity: ActivityDTO) => todayDate === activity.date)
    }

    const refresh = () => {
        fetchData()
    }

    async function fetchData() {
        setLoaded(false)
        setActivities(await getAllActivities("sort=date,desc"))
        setLoaded(true)
    }

    useEffect(() => {
        refresh()
    }, []);

    useEffect(() => {
        setToday(checkToday())
    }, [activities]);

    return (
        <main>
            <div className="main-container row justify-content-center text-center">
                <h3>Asistencias</h3>
                <h5>Seleccioná la actividad que quieras cargar su asistencia</h5>
                {loaded && activities.length > 0 && today &&
                    <div className="justify-content-center table-content p-2 mt-4 col-8 bg-warning">
                        <h3>Hoy!</h3>
                        <span className='d-flex justify-content-center'>
                            <h5>{dateToEsString(today.date)}</h5>
                            <button type="button" title='Cargar Asistencia' className="btn btn-danger mx-3" onClick={() => loadAttendance(today.id)}><i className=" fas fa-arrow-right"></i></button>
                        </span>
                    </div>
                }
                <div className="justify-content-center table-content mt-5 col-10 col-md-8">

                    {loaded ? <>
                        {
                            activities.length > 0 ?
                                <table className="table table-hover table-responsive">
                                    <thead>
                                        <tr>
                                            <th scope="col">Fecha</th>
                                            <th scope="col">Cargar Asistencia</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {activities
                                            //.filter((activity: ActivityDTO) => (!((tableFilter === 'Inactivos' && area.active) || (tableFilter === 'Activos' && !area.active))))
                                            .map((activity: ActivityDTO) => (
                                                <tr key={activity.id}>
                                                    <td className="td-attendance">{dateToEsString(activity.date)}</td>
                                                    <td className="td-attendance">
                                                        <span>
                                                            <button type="button" title='Cargar Asistencia' className="btn btn-danger" onClick={() => loadAttendance(activity.id)}><i className=" fas fa-arrow-right"></i></button>
                                                        </span>
                                                    </td>
                                                </tr>
                                            )
                                            )}
                                    </tbody>
                                </table>
                                : <p>No hay actividades cargadas</p>
                        }
                    </>
                        :
                        <div className="text-center">
                            <Spinner animation="border" className='text-danger my-2' variant="light" />
                        </div>
                    }
                </div>
                <Scroll showBelow={250} />
            </div>
        </main>
    );
}

export default withAuthenticationRequired(Attendance, {
    onRedirecting: () => <Loading />,
});