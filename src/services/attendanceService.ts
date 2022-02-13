import axios from 'axios';
import { AttendanceRequestDTO } from '../dtos/AttendanceRequestDTO';

export async function saveAttendance(activityId: number, attendanceRequest: AttendanceRequestDTO) {
    try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_DOMAIN}/save/getAll/${activityId}`, attendanceRequest)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}
