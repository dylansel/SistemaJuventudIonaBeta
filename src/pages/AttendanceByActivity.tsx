import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from './misc/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import JanijDTO from '../dtos/JanijDTO';
import { getAllJanijim } from '../services/janijService';
import { Button, Input, Spinner } from 'reactstrap';
import Scroll from '../components/UI/Layout/Scroll';
import { JanijAttendanceDTO } from '../dtos/JanijAttendanceDTO';
import ActivityDTO from '../dtos/ActivityDTO';
import { getActivityById } from '../services/activityService';

function AttendanceByActivity() {
    const history = useNavigate();
    let { activityId } = useParams();

    const [janijim, setJanijim] = useState<JanijDTO[]>([])
    const [activityData, setActivityData] = useState<ActivityDTO>()
    const [loaded, setLoaded] = useState(false)
    const [changes, setChanges] = useState<JanijAttendanceDTO[]>([])

    const handleSaveAttendance = () => {

    }

    const refresh = () => {
        fetchData()
    }
    async function fetchData() {
        setLoaded(false)
        setJanijim(await getAllJanijim("sort=group.ordinal,asc;firstName,asc;family.surname,asc"))
        setActivityData(await getActivityById(parseInt(activityId!)))
        setLoaded(true)
    }

    useEffect(() => {
        refresh()
    }, []);

    return (
        <main>
            <div className="filters d-flex mx-4 align-items-center justify-content-around">
                <button type="button" title='Volver' className="btn btn-danger mx-5" onClick={() => history(-1)}><i className=" fas fa-arrow-left"></i></button>
                {loaded && <h3>Actividad del {loaded && (new Date(activityData?.date!)).toLocaleDateString([], { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })} </h3>}
                <Button onClick={handleSaveAttendance} color='danger' type='button'>Guardar Asistencia</Button>
            </div>
            <div className="justify-content-center table-content mx-3 mt-4">
                {loaded ? <table className="table table-hover table-responsive">
                    <thead>
                        <tr>
                            <th scope="col">Nombre y Apellido</th>
                            <th scope="col">Grupo</th>
                            <th scope="col">Presente</th>
                            <th scope="col">Prueba</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            janijim
                                .filter((janij: JanijDTO) => (janij.active))
                                .map(janij => (
                                    <tr key={janij.id}>
                                        <td>{`${janij.name} ${janij.familySurname}`}</td>
                                        <td>{janij.groupName}</td>
                                        <td>
                                            <Input
                                                type='checkbox'
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                type='checkbox'
                                            />
                                        </td>
                                    </tr>
                                )
                                )}
                    </tbody>
                </table>
                    :
                    <div className="text-center">
                        <h2>Cargando Lista de Janijim...</h2>
                        <Spinner animation="border" className='text-danger my-2' variant="light" />
                    </div>
                }
            </div>
            <Scroll showBelow={250} />
        </main >
    );
}

export default withAuthenticationRequired(AttendanceByActivity, {
    onRedirecting: () => <Loading />,
});