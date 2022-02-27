import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from './misc/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import JanijDTO from '../dtos/JanijDTO';
import { getAllJanijim } from '../services/janijService';
import { Button, FormGroup, Input, Spinner } from 'reactstrap';
import Scroll from '../components/UI/Layout/Scroll';
import { JanijAttendanceRequestDTO } from '../dtos/JanijAttendanceRequestDTO';
import ActivityDTO from '../dtos/ActivityDTO';
import { getActivityById } from '../services/activityService';
import { AttendanceDTO } from '../dtos/AttendanceDTO';
import { getAttendanceByActivity } from '../services/attendanceService';
import { dateToEsString } from '../utils/misc/strings';
import { Present } from '../interfaces/Present';
import GroupDTO from '../dtos/GroupDTO';
import { getGroupById } from '../services/groupService';

function AttendanceList() {
    const history = useNavigate();
    let { activityId, groupId } = useParams();
    const [janijim, setJanijim] = useState<JanijDTO[]>([])
    const [activityData, setActivityData] = useState<ActivityDTO>()
    const [groupData, setGroupData] = useState<GroupDTO>()
    const [activityPreviousAttendance, setActivityPreviousAttendance] = useState<AttendanceDTO[]>()
    const [loaded, setLoaded] = useState(false)
    const [presentChecked, setPresentChecked] = useState<Present[]>([])
    const [changes, setChanges] = useState<JanijAttendanceRequestDTO[]>([])

    const handlePresent = (id: number) => {

    }

    const handleSaveAttendance = () => {

    }

    const refresh = () => {
        fetchData()
    }
    async function fetchData() {
        setLoaded(false)
        setJanijim(await getAllJanijim("sort=group.ordinal,asc;firstName,asc;family.surname,asc"))
        setActivityData(await getActivityById(parseInt(activityId!)))
        setGroupData(await getGroupById(parseInt(groupId!)))
        setActivityPreviousAttendance(await getAttendanceByActivity(parseInt(activityId!)))
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
                    <h4></h4>
                </>}
            </div>

            <div className="justify-content-center table-content mx-3 mt-4 text-center">
                {loaded ?
                    <>
                        <table className="table table-hover table-responsive">
                            <thead>
                                <tr>
                                    <th scope="col">Nombre y Apellido</th>
                                    <th scope="col">Grupo</th>
                                    <th scope="col">Presente</th>
                                    <th scope="col">Prueba</th>
                                </tr>
                            </thead>
                            <tbody>
                                {janijim
                                    .filter((janij: JanijDTO) => (
                                        janij.active && janij.groupId === parseInt(groupId!)
                                    ))
                                    .map(janij => (
                                        <tr key={janij.id}>
                                            <td>{`${janij.name} ${janij.familySurname}`}</td>
                                            <td>{janij.groupName}</td>
                                            <td>
                                                <Input
                                                    type='checkbox'
                                                    onChange={() => handlePresent(janij.id)}
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
                        <Button onClick={handleSaveAttendance} className='my-5' color='danger' type='button'>Grabar Asistencias</Button>
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

export default withAuthenticationRequired(AttendanceList, {
    onRedirecting: () => <Loading />,
});