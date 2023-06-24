import { withAuthenticationRequired } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { Input, Spinner } from 'reactstrap';
import Scroll from '../components/UI/Layout/Scroll';
import ActivityDTO from '../dtos/ActivityDTO';
import { getAllActivities } from '../services/activityService';
import Loading from './misc/Loading';
import { useNavigate } from 'react-router-dom';
import { dateToEsString } from '../utils/misc/dates';
import { getErrorByMessage } from '../utils/misc/errors';


export default function Attendance() {
    const history = useNavigate();
    const [activities, setActivities] = useState<any[]>([])
    const [loaded, setLoaded] = useState(false)
    const [today, setToday] = useState()
    const [canEditPreviousAttendances, setCanEditPreviousAttendances] = useState(false)
    const [error, setError] = useState("")

    const loadAttendance = (date: string) => {
        history(`/attendance/${date}`)
    }

    const checkToday = () => {
        const todayDate = new Date().toISOString().split('T')[0]
        return activities.find((activity: any) => todayDate === activity)
    }

    const refresh = () => {
        fetchData()
    }

    async function fetchData() {
        try {
            setLoaded(false)
            const activities:any = await getAllActivities()
            if(!activities || activities.error)throw new Error("Request failed with status code 400")
            setActivities(activities)
            setLoaded(true)
        } catch (error:any) {
            setLoaded(true)
            console.error(error.message);
            setError(error.message)
        }
        
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

                {(loaded && error == "") && activities.length > 0 && today &&
                    <div className="justify-content-center table-content p-2 mt-4 col-8 bg-warning attendanceToday">
                        <h3>Hoy!</h3>
                        <span className='d-flex justify-content-center'>
                            <h5>{dateToEsString(today)}</h5>
                            <button type="button" title='Cargar Asistencia' className="btn btn-danger mx-3" onClick={() => loadAttendance(today)}><i className=" fas fa-arrow-right"></i></button>
                        </span>
                    </div>
                }
                <span className="d-flex text-center justify-content-center my-4">
                    <p className='mx-3'>Permitir editar asistencias de otras fechas</p>
                    <Input type='checkbox' onChange={() => setCanEditPreviousAttendances(!canEditPreviousAttendances)} checked={canEditPreviousAttendances} />
                </span>

                <div className="justify-content-center table-content col-10 col-md-8 mb-5">

                    {loaded ? 
                    error == ""?
                    <>
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
                                            .filter((activity: any) => Number(activity.split("-")[0]) === new Date().getFullYear() && activity < new Date().toISOString().split('T')[0])
                                            .map((activity: any) => (
                                                <tr key={activity.id}>
                                                    <td className="td-attendance">{dateToEsString(activity)}</td>
                                                    <td className="td-attendance">
                                                        <span>
                                                            <button type="button" disabled={!canEditPreviousAttendances} title='Cargar Asistencia' className="btn btn-danger" onClick={() => loadAttendance(activity)}><i className=" fas fa-arrow-right"></i></button>
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
                        <h3>{getErrorByMessage(error)}</h3>
                    </div>
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

