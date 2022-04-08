import axios from 'axios';
import { AttendanceDTO } from '../dtos/AttendanceDTO';
import { JanijAttendanceRequestDTO } from '../dtos/JanijAttendanceRequestDTO';

export const getAttendanceByActivity = async (activityId: number): Promise<AttendanceDTO[]> => {
    try {
        const response = await axios(`${process.env.REACT_APP_BACKEND_DOMAIN}/attendance/getByActivity/${activityId}`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export const saveAttendance = async (activityId: number, janijAttendancesRequest: JanijAttendanceRequestDTO[]) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_DOMAIN}/attendance/save/${activityId}`, janijAttendancesRequest)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}
