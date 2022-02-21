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

    const loadAttendance = (id: number) => {
        history(`/attendance/${id}`)
    }

    const refresh = () => {
        fetchData()
    }

    async function fetchData() {
        setLoaded(false)
        await setActivities(await getAllActivities("sort=date,desc"))
        setLoaded(true)
    }

    useEffect(() => {
        refresh()
    }, []);

    return (
        <main>
            <div className="main-container row justify-content-center text-center">
                <h3>Asistencias</h3>
                <h5>Seleccioná la actividad que quieras cargar su asistencia</h5>
                {loaded && activities.length > 0 && (new Date().toISOString().split('T')[0] === activities[0].date) &&
                    <div className="justify-content-center table-content mx-3 mt-5 col-8 bg-warning">
                        <h2>Hoy!</h2>
                        <span className='d-flex justify-content-center'>
                            <h4>{dateToEsString(activities[0].date)}</h4>
                            <button type="button" title='Cargar Asistencia' className="btn btn-danger mx-3" onClick={() => loadAttendance(activities[0].id)}><i className=" fas fa-arrow-right"></i></button>
                        </span>
                    </div>
                }
                <div className="justify-content-center table-content mx-3 mt-5 col-8">

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