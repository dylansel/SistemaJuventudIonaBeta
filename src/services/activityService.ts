import axios from 'axios';
import ActivityDTO from '../dtos/ActivityDTO';
import ActivityRequestDTO from '../dtos/ActivityRequestDTO';
import FromToDateRequestDTO from '../dtos/FromToDateRequestDTO';

export async function getAllActivities(orderBy?: string): Promise<ActivityDTO[]> {
    try {
        const response = await axios(`${process.env.REACT_APP_BACKEND_DOMAIN!}/activity/getAll?${orderBy}`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function getActivityById(id: number): Promise<ActivityDTO> {
    try {
        const response = await axios(`${process.env.REACT_APP_BACKEND_DOMAIN!}/activity/get/${id}`)
        const data = await response.data
        return data as ActivityDTO
    } catch (error: any) {
        throw error
    }
}

export async function addActivity(activityToAdd: ActivityRequestDTO) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_DOMAIN}/activity/add`,activityToAdd)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function addMultipleActivities(fromToDate: FromToDateRequestDTO) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_DOMAIN}/activity/addMultiple`,fromToDate)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function updateActivity(id: number, activityToUpdate: ActivityRequestDTO) {
    try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_DOMAIN!}/activity/update/${id}`,activityToUpdate)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function deleteActivity(id: number) {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_DOMAIN!}/activity/delete/${id}`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}