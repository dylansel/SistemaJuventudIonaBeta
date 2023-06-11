import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from './misc/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Spinner } from 'reactstrap';
import Scroll from '../components/UI/Layout/Scroll';
import ActivityDTO from '../dtos/ActivityDTO';
import { getActivityById } from '../services/activityService';
import { dateToEsString } from '../utils/misc/dates';
import AreaDTO from '../dtos/AreaDTO';
import { getAllGroups } from '../services/groupService';
import GroupDTO from '../dtos/GroupDTO';
import { getAreaById } from '../services/areaService';

function AttendanceSelectGroup() {
    const history = useNavigate();
    let { activityId, areaId } = useParams();

    const [activityData, setActivityData] = useState<ActivityDTO>()
    const [areaData, setAreaData] = useState<AreaDTO>()
    const [groups, setGroups] = useState<GroupDTO[]>()
    const [loaded, setLoaded] = useState(false)

    const loadAttendance = (activityId: number, areaId: number, groupId: number) => {
        history(`/attendance/${activityId}/${areaId}/${groupId}`)
    }

    const refresh = () => {
        fetchData()
    }
    async function fetchData() {
        setLoaded(false)
        setGroups(await getAllGroups("sort=ordinal,asc"))
        setActivityData(await getActivityById(parseInt(activityId!)))
        setAreaData(await getAreaById(parseInt(areaId!)))
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

                    </div>
                </>}
            </div>

            {loaded ?
                <div className="justify-content-center mx-3 text-center">
                    {groups &&
                        <div className='mt-3 inline-grid'>
                            {groups?.filter((group: any) => group.area.id === areaData?.id)
                                .map((group: any) =>
                                    <Button key={group.name.split(" ")[0]} color="danger" size='lg' className="mx-5" title={group.name} onClick={() => loadAttendance(activityData?.id!, areaData?.id!, group.id)}>{group.name}</Button>
                                )}
                        </div>
                    }
                </div>
                :
                <Loading />
            }
            <Scroll showBelow={250} />
        </main >
    );
}

export default withAuthenticationRequired(AttendanceSelectGroup, {
    onRedirecting: () => <Loading />,
});