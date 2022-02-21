import axios from 'axios';
import { JanijAttendanceRequestDTO } from '../dtos/JanijAttendanceRequestDTO';

export async function saveAttendance(activityId: number, janijAttendanceRequest: JanijAttendanceRequestDTO[]) {
    try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_DOMAIN}/save/getAll/${activityId}`, janijAttendanceRequest)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}
