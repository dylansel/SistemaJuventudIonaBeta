import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from './misc/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import JanijDTO from '../dtos/JanijDTO';
import JanijListDTO from '../dtos/JanijListDTO';
import { getAllJanijim } from '../services/janijService';
import { Alert, Button, Input, Spinner } from 'reactstrap';
import Scroll from '../components/UI/Layout/Scroll';
import { JanijAttendanceRequestDTO } from '../dtos/JanijAttendanceRequestDTO';
import ActivityDTO from '../dtos/ActivityDTO';
import { getActivityById } from '../services/activityService';
import { AttendanceListDTO } from '../dtos/AttendanceListDTO';
import { getAttendanceByActivity, getAttendanceByGroup, saveAttendance } from '../services/attendanceService';
import { dateToEsString } from '../utils/misc/dates';
import GroupDTO from '../dtos/GroupDTO';
import { getGroupById } from '../services/groupService';
import { useCallbackPrompt } from '../customHooks/useCallbackPrompts';
import DialogBox from '../components/UI/Modals/DialogBox';
import { compareArrayObjects } from '../utils/dnd/dnd-functions';


export default function AttendanceList() {
    const history = useNavigate();
    let { date, area ,group } = useParams();
    const [janijimPresents, setJanijimPresents] = useState<AttendanceListDTO[]>([])
    const [changes, setChanges] = useState<AttendanceListDTO[]>([])
    const [loaded, setLoaded] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [showDialog, setShowDialog] = useState(false)
    const [showPrompt, confirmNavigation, cancelNavigation] =useCallbackPrompt(showDialog);
    const [error, setError] = useState({err:false,msg:""})

    if(!date || !group){ history('/attendance')}

    const handlePresent = (name: string) => {
        let newPresents: AttendanceListDTO[] = [...janijimPresents]
        const change = newPresents.find((change: AttendanceListDTO) => change.name === name)
        if (change) {
            change.attended = !change.attended
        }
        setJanijimPresents(newPresents)
    }


    const getChanges = () =>  compareArrayObjects(changes,janijimPresents);

    const handleSaveAttendance = () => {
        try {
            let request: AttendanceListDTO[] = getChanges();

            if (request.length > 0) {
                setIsSaving(true)
                setTimeout(async ()  => {
                    const day = date?.split("-")[2]
                    const month = date?.split("-")[1]
                    if(!day || !month){throw new Error("Error al guardar");}
                    await saveAttendance(day,month, request)
                    setIsSaving(false)
                    refresh()
                }, 3000);
            }
        } catch (error) {
            setError({err:false,msg:"Error al guardar"})
            console.log(error)
        }
        
    }

    const refresh = () => {
        fetchData()
    }

    async function fetchData() {
        setLoaded(false)
        const day = date?.split("-")[2]
        const month = date?.split("-")[1]
        if(!day || !month){return history('/attendance')}
        const attendanceLoaded = await getAttendanceByGroup(day, month, "05 Jiburim", true);
        const copiedAttendance = attendanceLoaded.map((item) => ({ ...item }));
        setJanijimPresents(attendanceLoaded)
        setChanges(copiedAttendance)
        setLoaded(true)
    }

    useEffect(() => {
        setShowDialog(getChanges().length > 0)
    }, [janijimPresents]);

    useEffect(() => {
        refresh()
    }, []);

    return (
        
        <main>
            <div className="filters mx-4 align-items-center justify-content-center">
                {loaded && <>
                    <div className="d-flex justify-content-center mb-4">
                        <button type="button" title='Volver' className="btn btn-danger mx-5" onClick={() => history(-1)}><i className=" fas fa-arrow-left"></i></button>
                        <h4>{loaded && dateToEsString(date || "")} </h4>
                    </div>
                    <div className="text-center">
                        <h4>{group}</h4>
                        <p>{janijimPresents.filter((janij: AttendanceListDTO) => janij.attended).length} Presentes</p>
                    </div>
                </>}
            </div>

            <div className="justify-content-center table-content mx-3 mt-4 text-center">
            {error.err && <Alert color="danger" className="text-center">{error.msg}</Alert>}
                {loaded ?
                    <div>
                        <table className="table table-hover table-responsive">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre y Apellido</th>
                                    <th scope="col">Presente</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {janijimPresents
                                    .map((janij: AttendanceListDTO, index: number) => (
                                        <tr key={index+1}>
                                            <td>{index + 1}</td>
                                            <td>{`${janij.name}`}</td>
                                            <td>
                                                <Input
                                                    type='checkbox'
                                                    name='present'
                                                    color='danger'
                                                   onChange={() => handlePresent(janij.name)}
                                                    disabled={isSaving}
                                                    checked={janij.attended}
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
