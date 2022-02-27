import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from './misc/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import JanijDTO from '../dtos/JanijDTO';
import { getAllJanijim } from '../services/janijService';
import { Button, Input, Spinner } from 'reactstrap';
import Scroll from '../components/UI/Layout/Scroll';
import { JanijAttendanceRequestDTO } from '../dtos/JanijAttendanceRequestDTO';
import ActivityDTO from '../dtos/ActivityDTO';
import { getActivityById } from '../services/activityService';
import { AttendanceDTO } from '../dtos/AttendanceDTO';
import { getAttendanceByActivity, saveAttendance } from '../services/attendanceService';
import { dateToEsString } from '../utils/misc/strings';
import GroupDTO from '../dtos/GroupDTO';
import { getGroupById } from '../services/groupService';

function AttendanceList() {
    const history = useNavigate();
    let { activityId, groupId } = useParams();
    const [janijim, setJanijim] = useState<JanijDTO[]>([])
    const [activityData, setActivityData] = useState<ActivityDTO>()
    const [groupData, setGroupData] = useState<GroupDTO>()
    const [attendanceLoaded, setAttendanceLoaded] = useState<AttendanceDTO[]>()
    const [janijimPresents, setJanijimPresents] = useState<JanijAttendanceRequestDTO[]>([])
    const [loaded, setLoaded] = useState(false)
    const [changes, setChanges] = useState<JanijAttendanceRequestDTO[]>([])

    const loadPresents = () => {
        let presents: JanijAttendanceRequestDTO[] = []
        //TODO: Problems with undefined elements. If I load janij 100-160, first 100 janijim are undefined
        const janijimFiltered = janijim
            .filter((janij: JanijDTO) => janij.active && janij.groupId === parseInt(groupId!))
        janijimFiltered.forEach((janij: JanijDTO) => {
            const attendance = attendanceLoaded?.find((attendance: AttendanceDTO) => attendance.janijId === janij.id)
            presents[janij.id] = {
                janijId: janij.id,
                present: attendance ? true : false,
                trial: attendance && attendance.trial ? true : false
            }
        })
        return presents
    }

    const handlePresent = (id: number) => {
        let newPresents: JanijAttendanceRequestDTO[] = [...changes]
        newPresents[id] = {
            janijId: janijimPresents[id].janijId,
            present: !janijimPresents[id].present,
            trial: janijimPresents[id].trial
        }
        setChanges(newPresents)
    }

    const handleTrial = (id: number) => {
        let newPresents: JanijAttendanceRequestDTO[] = [...changes]
        newPresents[id] = {
            janijId: janijimPresents[id].janijId,
            present: janijimPresents[id].present,
            trial: !janijimPresents[id].trial
        }
        setChanges(newPresents)
    }

    const handleSaveAttendance = () => {
        let request: JanijAttendanceRequestDTO[] = []
        for (const id in changes) {
            if (changes[id]) {
                if (changes[id].present !== janijimPresents[id].present ||
                    changes[id].trial !== janijimPresents[id].trial) {
                    request.push(changes[id])
                }
            }
        }
        saveAttendance(activityData?.id!, request)
    }

    const refresh = () => {
        fetchData()
    }
    async function fetchData() {
        setLoaded(false)
        setJanijim(await getAllJanijim("sort=group.ordinal,asc;firstName,asc;family.surname,asc"))
        setActivityData(await getActivityById(parseInt(activityId!)))
        setGroupData(await getGroupById(parseInt(groupId!)))
        setAttendanceLoaded(await getAttendanceByActivity(parseInt(activityId!)))
        setLoaded(true)
    }

    let i = 0

    useEffect(() => {
        refresh()
    }, []);

    useEffect(() => {
        setJanijimPresents(loadPresents())
        setChanges([...janijimPresents])
        //TODO: Because this depends on janijim list, it doesn't load all the times.
    }, [janijim]);

    return (
        <main>
            <div className="filters mx-4 align-items-center justify-content-center">
                {loaded && <>
                    <div className="d-flex justify-content-center mb-4">
                        <button type="button" title='Volver' className="btn btn-danger mx-5" onClick={() => history(-1)}><i className=" fas fa-arrow-left"></i></button>
                        <h4>{loaded && dateToEsString(activityData?.date!)} </h4>
                    </div>
                    <div className="text-center">
                        <h4>{groupData?.name}</h4>
                    </div>
                </>}
            </div>

            <div className="justify-content-center table-content mx-3 mt-4 text-center">
                {loaded ?
                    <div>
                        <table className="table table-hover table-responsive">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre y Apellido</th>
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
                                            <td>{++i}</td>
                                            <td>{`${janij.name} ${janij.familySurname}`}</td>
                                            <td>
                                                <Input
                                                    type='checkbox'
                                                    name='present'
                                                    onChange={() => handlePresent(janij.id)}
                                                    defaultChecked={janijimPresents[janij.id] ? janijimPresents[janij.id]?.present! : false}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    type='checkbox'
                                                    name='trial'
                                                    disabled={!janijimPresents[janij.id].present!}
                                                    //TODO: Here we have to use changes array values but it has problems with checkboxs
                                                    onChange={() => handleTrial(janij.id)}
                                                    defaultChecked={janijimPresents[janij.id] ? janijimPresents[janij.id]?.trial! : false}
                                                />
                                            </td>
                                        </tr>
                                    )
                                    )}
                            </tbody>
                        </table>
                        <Button onClick={handleSaveAttendance} className='my-3' color='danger' type='button'>Grabar Asistencias</Button>
                    </div>

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