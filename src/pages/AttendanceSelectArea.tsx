import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from './misc/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import JanijDTO from '../dtos/JanijDTO';
import { getAllJanijim } from '../services/janijService';
import { Button, FormGroup, Input, Label, Spinner } from 'reactstrap';
import Scroll from '../components/UI/Layout/Scroll';
import ActivityDTO from '../dtos/ActivityDTO';
import { getActivityById } from '../services/activityService';
import { dateToEsString, isEmptyOrSpaces } from '../utils/misc/strings';
import AreaDTO from '../dtos/AreaDTO';
import { getAllAreas } from '../services/areaService';
import { getAttendanceByActivity, saveAttendance } from '../services/attendanceService';
import { AttendanceDTO } from '../dtos/AttendanceDTO';
import { JanijAttendanceRequestDTO } from '../dtos/JanijAttendanceRequestDTO';
import { useCallbackPrompt } from '../customHooks/useCallbackPrompts';
import DialogBox from '../components/UI/Modals/DialogBox';

function AttendanceSelectArea() {
    const history = useNavigate();
    let { activityId } = useParams();

    const [showDialog, setShowDialog] = useState(false)
    const [showPrompt, confirmNavigation, cancelNavigation] =
        useCallbackPrompt(showDialog)

    const [janijim, setJanijim] = useState<JanijDTO[]>([])
    const [searchValue, setSearchValue] = useState('')
    const [activityData, setActivityData] = useState<ActivityDTO>()
    const [janijimPresents, setJanijimPresents] = useState<JanijAttendanceRequestDTO[]>([])
    const [changes, setChanges] = useState<JanijAttendanceRequestDTO[]>([])
    const [areas, setAreas] = useState<AreaDTO[]>()
    const [loaded, setLoaded] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const loadAttendance = (activityId: number, areaId: number) => {
        history(`/attendance/${activityId}/${areaId}`)
    }

    const loadPresents = async () => {
        let presents: JanijAttendanceRequestDTO[] = []
        const janijim = await getAllJanijim("sort=group.ordinal,asc;firstName,asc;family.surname,asc")
        const attendanceLoaded = await getAttendanceByActivity(parseInt(activityId!))
        const janijimFiltered = janijim
            .filter((janij: JanijDTO) => janij.active)
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

    const findJanij = (janijInput: string) => {
        if (janijInput === "") return []

        return janijim.filter((janij: JanijDTO) => (janij.active && (
            janij.name.toLowerCase().startsWith(janijInput.toLowerCase()) ||
            janij.family.surname.toLowerCase().startsWith(janijInput.toLowerCase()) ||
            `${janij.name.toLowerCase()} ${janij.family.surname.toLowerCase()}`.startsWith(janijInput.toLowerCase())))
        )
    }

    const handleChange = (e?: any) => {
        if (e) {
            setSearchValue(e.target.value)
        } else {
            setSearchValue("")
        }
    }

    const handlePresent = (id: number) => {
        let newPresents: JanijAttendanceRequestDTO[] = [...changes]
        const change = newPresents.find((change: JanijAttendanceRequestDTO) => change.janijId === id)
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
        const change = newPresents.find((change: JanijAttendanceRequestDTO) => change.janijId === id)
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
                handleChange()
                refresh()
            }, 3000);
        }
    }

    const refresh = () => {
        fetchData()
    }
    async function fetchData() {
        setLoaded(false)
        setAreas(await getAllAreas("sort=ordinal,asc"))
        setJanijim(await getAllJanijim("sort=group.ordinal,asc;firstName,asc;family.surname,asc"))
        setActivityData(await getActivityById(parseInt(activityId!)))
        setJanijimPresents(await loadPresents())
        setChanges(await loadPresents())
        setLoaded(true)
    }

    useEffect(() => {
        setShowDialog(getChanges().length > 0)
    }, [changes]);

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <main>
            <div className="align-items-center justify-content-center mx-2">
                {loaded && <>
                    <div className="d-flex justify-content-center mb-4">
                        <button type="button" title='Volver' className="btn btn-danger mx-5" onClick={() => history(-1)}><i className=" fas fa-arrow-left"></i></button>
                        <h4>{loaded && dateToEsString(activityData?.date!)} </h4>
                    </div>
                    <div className="d-flex col-12 justify-content-center text-center align-middle mt-3">
                        <Label for='janij'>Buscar Janij:</Label>
                        <FormGroup>
                            <Input
                                id="janij"
                                name="janij"
                                type="text"
                                autoComplete='off'
                                onChange={handleChange}
                                value={searchValue}
                            >
                            </Input>
                        </FormGroup>
                    </div>
                </>}
            </div>

            {loaded ?
                <div className="justify-content-center text-center">
                    {findJanij(searchValue).length > 0 &&
                        <div>
                            <table className="table table-hover table-responsive mx-3 mb-4">
                                <thead>
                                    <tr>
                                        <th scope="col">Nombre y Apellido</th>
                                        <th scope="col">Grupo</th>
                                        <th scope="col">Presente</th>
                                        <th scope="col">Prueba</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {findJanij(searchValue).map((janij: JanijDTO) => (
                                        <tr key={janij.id}>
                                            <td>{`${janij.name} ${janij.family.surname}`}</td>
                                            <td>{janij.group.name}</td>
                                            <td>
                                                <Input
                                                    type='checkbox'
                                                    name='present'
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
                                    ))}
                                </tbody>
                            </table>
                            <Button
                                onClick={handleSaveAttendance}
                                className='my-3'
                                color={isSaving ? 'success' : 'secondary'}
                                disabled={isSaving}
                                type='button'
                            >
                                {isSaving ? <>Grabando...<Spinner animation="border" variant="light" size="sm" /></> : 'Grabar Asistencias'}                            </Button>
                        </div>
                    }
                    {!isEmptyOrSpaces(searchValue) && findJanij(searchValue).length === 0 && <p>No hay janijim activos con el nombre "{searchValue}"</p>}

                    {areas &&
                        <div className='mt-3 inline-grid'>
                            {areas?.filter((area: AreaDTO) => area.active)
                                .map((area: AreaDTO) =>
                                    <Button key={area.id} color="danger" size='lg' className="mx-5" title={area.name} onClick={() => loadAttendance(activityData?.id!, area.id)}>{area.name}</Button>
                                )}
                        </div>
                    }
                </div>
                :
                <div className="table-content text-center mx-3">
                    <h2>Cargando...</h2>
                    <Spinner animation="border" className='text-danger my-2' variant="light" />
                </div>
            }
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

export default withAuthenticationRequired(AttendanceSelectArea, {
    onRedirecting: () => <Loading />,
});