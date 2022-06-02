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
import { dateToEsString } from '../utils/misc/dates';
import GroupDTO from '../dtos/GroupDTO';
import { getGroupById } from '../services/groupService';
import { useCallbackPrompt } from '../customHooks/useCallbackPrompts';
import DialogBox from '../components/UI/Modals/DialogBox';

function AttendanceList() {
    const history = useNavigate();
    let { activityId, groupId } = useParams();
    const [janijim, setJanijim] = useState<JanijDTO[]>([])
    const [activityData, setActivityData] = useState<ActivityDTO>()
    const [groupData, setGroupData] = useState<GroupDTO>()
    const [janijimPresents, setJanijimPresents] = useState<JanijAttendanceRequestDTO[]>([])
    const [loaded, setLoaded] = useState(false)
    const [changes, setChanges] = useState<JanijAttendanceRequestDTO[]>([])
    const [isSaving, setIsSaving] = useState(false)

    const [showDialog, setShowDialog] = useState(false)
    const [showPrompt, confirmNavigation, cancelNavigation] =
        useCallbackPrompt(showDialog)

    const loadPresents = async () => {
        let presents: JanijAttendanceRequestDTO[] = []
        const janijim = await getAllJanijim("sort=group.ordinal,asc;firstName,asc;family.surname,asc")
        const attendanceLoaded = await getAttendanceByActivity(parseInt(activityId!))
        const janijimFiltered = janijim
            .filter((janij: JanijDTO) => janij.active && janij.group.id === parseInt(groupId!))
        janijimFiltered.forEach((janij: JanijDTO) => {
            const attendance = attendanceLoaded?.find((attendance: AttendanceDTO) => attendance.janijId === janij.id)
            presents.push({
                janijId: janij.id,
                present: attendance ? true : false,
                trial: attendance && attendance.trial ? true : false
            })
        })
        return presents
    }

    const getDataById = (id: number) => {
        if (changes) {
            return changes.find((change: JanijAttendanceRequestDTO) => change.janijId === id)
        }
    }

    const handlePresent = (id: number) => {
        let newPresents: JanijAttendanceRequestDTO[] = [...changes]
        const change = newPresents.find((change: AttendanceDTO) => change.janijId === id)
        if (change) {
            change.present = !change.present
            if (!change.present) {
                change.trial = false
            }
        }
        setChanges(newPresents)
    }

    const handleTrial = (id: number) => {
        let newPresents: JanijAttendanceRequestDTO[] = [...changes]
        const change = newPresents.find((change: AttendanceDTO) => change.janijId === id)
        if (change) {
            change.trial = !change.trial
        }
        setChanges(newPresents)
    }

    const getChanges = () => {
        let request: JanijAttendanceRequestDTO[] = []
        Object.values(changes).forEach((change: JanijAttendanceRequestDTO) => {
            const dbObject = janijimPresents.find
                ((present: JanijAttendanceRequestDTO) => present.janijId === change.janijId)
            if (dbObject && (dbObject.present !== change.present || dbObject.trial !== change.trial)) {
                request.push(change)
            }
        })
        return request
    }

    const handleSaveAttendance = () => {
        let request: JanijAttendanceRequestDTO[] = getChanges()
        if (request.length > 0) {
            setIsSaving(true)
            setTimeout(() => {
                saveAttendance(activityData?.id!, request)
                setIsSaving(false)
                refresh()
            }, 3000);
        }
    }

    const refresh = () => {
        fetchData()
    }
    async function fetchData() {
        setLoaded(false)
        setJanijim(await getAllJanijim("sort=group.ordinal,asc;firstName,asc;family.surname,asc"))
        setActivityData(await getActivityById(parseInt(activityId!)))
        setGroupData(await getGroupById(parseInt(groupId!)))
        setJanijimPresents(await loadPresents())
        setChanges(await loadPresents())
        setLoaded(true)
    }

    useEffect(() => {
        setShowDialog(getChanges().length > 0)
    }, [changes]);

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
                    <div className="text-center">
                        <h4>{groupData?.name}</h4>
                        <p>{janijimPresents.filter((janij: JanijAttendanceRequestDTO) => janij.present).length} Presentes</p>
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
                                        janij.active && janij.group.id === parseInt(groupId!)
                                    ))
                                    .map((janij: JanijDTO, index: number) => (
                                        <tr key={janij.id}>
                                            <td>{index + 1}</td>
                                            <td>{`${janij.name} ${janij.family.surname}`}</td>
                                            <td>
                                                <Input
                                                    type='checkbox'
                                                    name='present'
                                                    color='danger'
                                                    onChange={() => handlePresent(janij.id)}
                                                    disabled={isSaving}
                                                    checked={getDataById(janij.id)?.present}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    type='checkbox'
                                                    name='trial'
                                                    onChange={() => handleTrial(janij.id)}
                                                    disabled={isSaving || !getDataById(janij.id)?.present}
                                                    checked={getDataById(janij.id)?.trial}
                                                />
                                            </td>
                                        </tr>
                                    )
                                    )}
                            </tbody>
                        </table>
                        <Button
                            onClick={handleSaveAttendance}
                            className='my-3'
                            color={isSaving ? 'success' : 'danger'}
                            disabled={isSaving}
                            type='button'
                        >
                            {isSaving ? <>Grabando...<Spinner animation="border" variant="light" size="sm" /></> : 'Grabar Asistencias'}
                        </Button>
                    </div>

                    :
                    <Loading />
                }
            </div>
            <DialogBox
                title='Alerta'
                text='¿Estás seguro que deseas salir? Hay cambios sin guardar.'
                showDialog={showPrompt}
                confirmNavigation={confirmNavigation}
                cancelNavigation={cancelNavigation}
            />
            <Scroll showBelow={250} />
        </main >
    );
}

export default withAuthenticationRequired(AttendanceList, {
    onRedirecting: () => <Loading />,
});