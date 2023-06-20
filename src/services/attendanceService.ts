import axios from 'axios';
import { AttendanceDTO } from '../dtos/AttendanceDTO';
import { AttendanceListDTO } from '../dtos/AttendanceListDTO';
import { JanijAttendanceRequestDTO } from '../dtos/JanijAttendanceRequestDTO';
import { getCredentials } from "../auth/authUtils";
const credentials = getCredentials();

export const getAttendanceByActivity = async (activityId: number): Promise<AttendanceDTO[]> => {
    try {
        const response = await axios(`${process.env.REACT_APP_BACKEND_DOMAIN}/attendance/getByActivity/${activityId}`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}


export const getAttendanceByGroup = async (day: string,month: string,group: string, restricted:boolean = false): Promise<AttendanceListDTO[]> => {
    try {
        const response = await axios(
            `${process.env.REACT_APP_BACKEND_DOMAIN}?action=attendances&month=${month}&day=${day}&group=${group}&restricted=${restricted}&${credentials}`
          );
          const data = await response.data.content.attendances;
        return data;

    } catch (error: any) {
        throw error
    }
}

export const getAllAttendanceByDate = async (day: string,month: string, restricted:boolean = false): Promise<AttendanceDTO[]> => {
    try {
        const response = await axios(
            `${process.env.REACT_APP_BACKEND_DOMAIN}?action=attendances&month=${month}&day=${day}&restricted=${restricted}&${credentials}`
          );
          const data = await response.data.content.attendances;
          return data;

    } catch (error: any) {
        throw error
    }
}
export const saveAttendance = async (day: string,month: string,attendances:AttendanceDTO[] | AttendanceListDTO[]) => {
    try {
          const response = await axios({
            method: "post",
            url: `${process.env.REACT_APP_BACKEND_DOMAIN}?action=setAttendances&month=${month}&day=${day}&${credentials}`,
            data: JSON.stringify(attendances),
          });
          const data = await response.data.content;
          return data;

    } catch (error: any) {
        throw error
    }
}

