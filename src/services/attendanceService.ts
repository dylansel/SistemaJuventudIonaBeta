import axios from 'axios';
import { JanijAttendanceRequestDTO } from '../dtos/JanijAttendanceRequestDTO';

export async function getAttendanceByActivity(activityId: number) {
    try {
        const response = await axios(`${process.env.REACT_APP_BACKEND_DOMAIN}/attendance/getByActivity/${activityId}`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function saveAttendance(activityId: number, janijAttendancesRequest: JanijAttendanceRequestDTO[]) {
    try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_DOMAIN}/attendance/save/${activityId}`, janijAttendancesRequest)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}
