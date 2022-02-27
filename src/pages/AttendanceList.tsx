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
import AreaDTO from '../dtos/AreaDTO';
import { getAllAreas } from '../services/areaService';
import { getAllGroups } from '../services/groupService';
import GroupDTO from '../dtos/GroupDTO';
import { Present } from '../interfaces/Present';

function AttendanceList() {
    const history = useNavigate();
    let { activityId } = useParams();

    const [janijim, setJanijim] = useState<JanijDTO[]>([])
    const [activityData, setActivityData] = useState<ActivityDTO>()
    const [areas, setAreas] = useState<AreaDTO[]>()
    const [groups, setGroups] = useState<GroupDTO[]>()
    const [activityPreviousAttendance, setActivityPreviousAttendance] = useState<AttendanceDTO[]>()
    const [loaded, setLoaded] = useState(false)
    const [areaSelected, setAreaSelected] = useState<number>(-1)
    const [groupSelected, setGroupSelected] = useState<number>(-1)
    const [presentChecked, setPresentChecked] = useState<Present[]>([])
    const [changes, setChanges] = useState<JanijAttendanceRequestDTO[]>([])

    const resetFilters = () => {
        setAreaSelected(-1)
        setGroupSelected(-1)
    }

    const handleAreaChange = (e: any) => {
        setAreaSelected(parseInt(e.target.value))
        setGroupSelected(-1)
    }

    const handleGroupChange = (e: any) => {
        setGroupSelected(e.target.value)
    }

    const handlePresent = (id: number) => {
        
    }

    const handleSaveAttendance = () => {

    }

    const refresh = () => {
        fetchData()
    }
    async function fetchData() {
        setLoaded(false)
        setAreas(await getAllAreas("sort=ordinal,asc"))
        setGroups(await getAllGroups("sort=ordinal,asc"))
        setJanijim(await getAllJanijim("sort=group.ordinal,asc;firstName,asc;family.surname,asc"))
        setActivityData(await getActivityById(parseInt(activityId!)))
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
                    <div className="d-flex col-12 justify-content-center text-center">
                        <FormGroup className='no-margin'>
                            <Input
                                id="areaId"
                                name="areaId"
                                type="select"
                                disabled={!loaded || !areas}
                                onChange={handleAreaChange}
                                value={areaSelected}
                            >
                                {(!(loaded && areas)) &&
                                    <option disabled selected>Cargando...</option>
                                }
                                {(loaded) && <option key="-1" value="-1" selected disabled>Area</option>}
                                {loaded && areas!
                                    .map((area: AreaDTO) => (
                                        <option key={area.id} value={area.id}>{area.name}</option>
                                    ))}
                            </Input>
                        </FormGroup>
                        <FormGroup className='no-margin mx-5'>
                            <Input
                                id="groupId"
                                name="groupId"
                                type="select"
                                disabled={!loaded || !groups || areaSelected === -1}
                                onChange={handleGroupChange}
                                value={groupSelected}
                            >
                                {(!(loaded && groups)) &&
                                    <option disabled selected>Cargando...</option>
                                }
                                {(loaded) && <option key="-1" value="-1" selected disabled>Grupo</option>}
                                {loaded && groups!
                                    .filter((group: GroupDTO) => group.areaId === areaSelected || areaSelected === -1)
                                    .map((group: GroupDTO) => (
                                        <option key={group.id} value={group.id}>{group.name}</option>
                                    ))}
                            </Input>
                        </FormGroup>
                        <Button onClick={resetFilters} color="danger" title="Reiniciar Filtros">Resetear filtros</Button>
                    </div>
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
                                        janij.active && (
                                            (areaSelected === -1) ||
                                            ((groupSelected === -1 && areas?.find((area: AreaDTO) => area.id === groups?.find((group: GroupDTO) => group.id === janij.groupId)?.areaId)?.id === areaSelected!)) ||
                                            (groupSelected !== -1 && janij.groupId === parseInt(groupSelected.toString())))
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
                        <h2>Cargando Asistencias de la actividad...</h2>
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