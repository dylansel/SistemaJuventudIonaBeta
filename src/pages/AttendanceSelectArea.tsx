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
import { dateToEsString } from '../utils/misc/strings';
import AreaDTO from '../dtos/AreaDTO';
import { getAllAreas } from '../services/areaService';
import { saveAttendance } from '../services/attendanceService';

function AttendanceSelectArea() {
    const history = useNavigate();
    let { activityId } = useParams();

    const [janijim, setJanijim] = useState<JanijDTO[]>([])
    const [searchValue, setSearchValue] = useState('')
    const [janijimSearched, setJanijimSearched] = useState<JanijDTO[]>([])
    const [activityData, setActivityData] = useState<ActivityDTO>()
    const [areas, setAreas] = useState<AreaDTO[]>()
    const [loaded, setLoaded] = useState(false)

    const loadAttendance = (activityId: number, areaId: number) => {
        history(`/attendance/${activityId}/${areaId}`)
    }

    const findJanij = (janijInput: string) => {
        return janijim.filter((janij: JanijDTO) => (janij.active && (
            janij.name.toLowerCase().includes(janijInput.toLowerCase()) ||
            janij.familySurname.toLowerCase().includes(janijInput.toLowerCase()) ||
            `${janij.name.toLowerCase()} ${janij.familySurname.toLowerCase()}`.includes(janijInput.toLowerCase())))
        )
    }

    const handleChange = (e?: any) => {
        if (e) {
            setSearchValue(e.target.value)
            setJanijimSearched(findJanij(searchValue))
        } else {
            setSearchValue("")
            setJanijimSearched([])
        }
    }

    const handlePresent = (id: number) => {

    }

    const handleSaveAttendance = () => {
        handleChange()
        saveAttendance(activityData?.id!, [])
    }

    const refresh = () => {
        fetchData()
    }
    async function fetchData() {
        setLoaded(false)
        setAreas(await getAllAreas("sort=ordinal,asc"))
        setJanijim(await getAllJanijim("sort=group.ordinal,asc;firstName,asc;family.surname,asc"))
        setActivityData(await getActivityById(parseInt(activityId!)))
        setLoaded(true)
    }

    useEffect(() => {
        refresh()
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
                    {janijimSearched.length > 0 && <div>
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
                                {janijimSearched.map((janij: JanijDTO) => (
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
                                ))}
                            </tbody>
                        </table>
                        <Button title='Save' onClick={() => handleSaveAttendance()}>Guardar Asistencia</Button>
                    </div>

                    }
                    {searchValue != "" && janijimSearched.length === 0 && <p>No hay janijim activos con el nombre "{searchValue}"</p>}

                    {areas &&
                        <div className='mt-3 inline-grid'>
                            {areas?.map((area: AreaDTO) =>
                                <Button color="danger" size='lg' className="mx-5" title={area.name} onClick={() => loadAttendance(activityData?.id!, area.id)}>{area.name}</Button>
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
            <Scroll showBelow={250} />
        </main >
    );
}

export default withAuthenticationRequired(AttendanceSelectArea, {
    onRedirecting: () => <Loading />,
});