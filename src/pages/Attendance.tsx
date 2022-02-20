import { withAuthenticationRequired } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
import Scroll from '../components/UI/Layout/Scroll';
import ActivityDTO from '../dtos/ActivityDTO';
import { getAllActivities } from '../services/activityService';
import Loading from './misc/Loading';
import { useNavigate } from 'react-router-dom';

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
                <div className="justify-content-center table-content mx-3 mt-5 col-8">

                    {loaded ? <>
                        {(new Date().toISOString().split('T')[0] === activities[0].date) && <div>
                            <p>Actividad de hoy {activities[0].date} cuesta ${activities[0].individualPrice}</p>
                        </div>}
                        <table className="table table-hover table-responsive">
                            <thead>
                                <tr>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Cargar Asistencia</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activities
                                    //.filter((activity: ActivityDTO) => (!((tableFilter === 'Inactivos' && area.active) || (tableFilter === 'Activos' && !area.active))))
                                    .map((activity: ActivityDTO) => (
                                        <tr key={activity.id}>
                                            <td className="td-attendance">{new Date(activity.date).toLocaleDateString([], { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'})}</td>
                                            <td className="td-attendance">${activity.individualPrice}</td>
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