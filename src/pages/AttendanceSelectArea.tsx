import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from './misc/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import JanijDTO from '../dtos/JanijDTO';
import { getAllJanijim } from '../services/janijService';
import { Alert, Button, FormGroup, Input, Label, Spinner } from 'reactstrap';
import Scroll from '../components/UI/Layout/Scroll';
import ActivityDTO from '../dtos/ActivityDTO';
import { getActivityById } from '../services/activityService';
import {isEmptyOrSpaces } from '../utils/misc/strings';
import {dateToEsString} from '../utils/misc/dates';
import AreaDTO from '../dtos/AreaDTO';
import { getAllAttendanceByDate, getAttendanceByActivity, getAttendanceByGroup, saveAttendance } from '../services/attendanceService';
import { AttendanceDTO } from '../dtos/AttendanceDTO';
import { JanijAttendanceRequestDTO } from '../dtos/JanijAttendanceRequestDTO';
import { useCallbackPrompt } from '../customHooks/useCallbackPrompts';
import DialogBox from '../components/UI/Modals/DialogBox';
import JanijListDTO from '../dtos/JanijListDTO';
import { AttendanceListDTO } from '../dtos/AttendanceListDTO';
import { compareArrayObjects } from '../utils/dnd/dnd-functions';
import { getAllGroups } from '../services/groupService';
import { getErrorByMessage } from '../utils/misc/errors';

export default function AttendanceSelectArea() {
    const history = useNavigate();
    let { date } = useParams();

    const [showDialog, setShowDialog] = useState(false)
    const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(showDialog)
    const [searchValue, setSearchValue] = useState('')
    const [activityData, setActivityData] = useState<ActivityDTO>()
    const [janijimPresents, setJanijimPresents] = useState<AttendanceDTO[]>([])
    const [changes, setChanges] = useState<AttendanceDTO[]>([])
    const [areas, setAreas] = useState<AreaDTO[]>()
    const [loaded, setLoaded] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [errorAlert, setErrorAlert] = useState({err:false,msg:""})
    const [error, setError] = useState("")

    const loadAttendance = (date: string, area: string) => {
        history(`/attendance/${date}/${area}`)
    }


    const findJanij = (janijInput: string) => {
        if (janijInput === "") return []

        return janijimPresents.filter((janij: AttendanceDTO) => (
          janij.name.split(" ")[0]?.toLowerCase().startsWith(janijInput.toLowerCase()) ||
          janij.name.split(" ")[1]?.toLowerCase().startsWith(janijInput.toLowerCase()) ||
          `${janij.name.split(" ")[0]?.toLowerCase()} ${janij.name.split(" ")[1]?.toLowerCase()}`.startsWith(janijInput.toLowerCase()) 
        ));
        
    }

    const handleChange = (e?: any) => {
        if (e) {
            setSearchValue(e.target.value)
        } else {
            setSearchValue("")
        }
    }

    const handlePresent = (name: string) => {
      let newPresents: AttendanceDTO[] = [...janijimPresents]
      const change = newPresents.find((change: AttendanceDTO) => change.name === name)
      if (change) {
          change.attended = !change.attended
      }
      setJanijimPresents(newPresents)
  }

   
    const getChanges = () =>  compareArrayObjects(changes,janijimPresents);
    


    const handleSaveAttendance = async () => {
      try {
          let request: AttendanceListDTO[] = getChanges();
          if (request.length > 0) {
              setIsSaving(true)
              const day = date?.split("-")[2]
              const month = date?.split("-")[1]
              if(!day || !month){throw new Error("Error al guardar");}
              await saveAttendance(day,month, request)
              setIsSaving(false)
              refresh()
          }
      } catch (error) {
          setErrorAlert({err:true,msg:"Error al guardar"})
          console.log(error)
          setIsSaving(false)
      }
      
  }

    const refresh = () => {
        fetchData()
    }

    const getAreas = async () => {
      const groups = await getAllGroups()
      let areas:any[] = []
      groups.forEach(el =>{
        if(!areas.includes(el.memberOf)){
          areas.push(el.memberOf)
        }
      })
      return areas
    }
    const formatAttendanceLoaded = (arr: any[]): any[] => {
        let Attendance = arr.map((el: any) => ({
          name: el.name,
          group: el.group,
          attended: el.attended[0]
        }));
      
        return Attendance;
      };
    async function fetchData() {
        setLoaded(false)
        setError("");
        try {
            setAreas(await getAreas())
            const day = date?.split("-")[2]
            const month = date?.split("-")[1]
            if(!day || !month ){return history('/attendance')}
            const attendanceLoaded:any = await getAllAttendanceByDate(day!, month!, false);
            if(!attendanceLoaded || attendanceLoaded.error)throw new Error("Request failed with status code 400")
            const attendance = formatAttendanceLoaded(attendanceLoaded);
            console.log(attendance)
            const copiedAttendance = attendance.map((item:any) => ({ ...item }));
            setJanijimPresents(attendance)
            setChanges(copiedAttendance)
            setLoaded(true)
        } catch (error:any) {
            console.error(error);
            setError(error.message);
            setLoaded(true);
        }

        
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
          {errorAlert.err && <Alert color="danger" className="text-center">{errorAlert.msg}</Alert>}
              {(loaded && error == "") && <>
                  <div className="d-flex justify-content-center mb-4">
                      <button type="button" title='Volver' className="btn btn-danger mx-5" onClick={() => history(-1)}><i className=" fas fa-arrow-left"></i></button>
                      <h4>{loaded && dateToEsString(date!)} </h4>
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
            error == ""?
              <div className="justify-content-center text-center">
                  {findJanij(searchValue).length > 0 &&
                      <div>
                          <table className="table table-hover table-responsive mx-3 mb-4">
                              <thead>
                                  <tr>
                                      <th scope="col">Nombre y Apellido</th>
                                      <th scope="col">Grupo</th>
                                      <th scope="col">Presente</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {findJanij(searchValue).map((janij: AttendanceDTO,index:number) => (
                                      <tr key={index}>
                                          <td>{`${janij.name}`}</td>
                                          <td>{janij.group?.split(" ")[1]}</td>
                                          <td>
                                              <Input
                                                  type='checkbox'
                                                  name='present'
                                                  onChange={() => handlePresent(janij.name)}
                                                  disabled={isSaving}
                                                  checked={janij.attended}
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
                          {areas?.map((area: any,index) =>
                                  <Button key={index} color="danger" size='lg' className="mx-5" title={area} onClick={() => loadAttendance(date!, area)}>{area}</Button>
                              )}
                      </div>
                  }
              </div>
               :
               <div className="text-center">
                   <h3>{getErrorByMessage(error)}</h3>
               </div>
               :
              <Loading />
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
