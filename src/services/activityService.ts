import axios from 'axios';
import ActivityDTO from '../dtos/ActivityDTO';
import ActivityRequestDTO from '../dtos/ActivityRequestDTO';
import MultipleActivitiesRequestDTO from '../dtos/MultipleActivitiesRequestDTO';
import { add, deleteOne, get, getAll, update } from './crudService';

export async function getAllActivities(orderBy?: string) {
    return getAll("activity", orderBy)
}

export async function getActivityById(id: number) {
    return get("activity", id)
}

export async function addActivity(activityToAdd: ActivityRequestDTO) {
    return add("activity", activityToAdd)
}

export async function addMultipleActivities(requestDTO: MultipleActivitiesRequestDTO) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_DOMAIN}/activity/addMultiple`, requestDTO)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function updateActivity(id: number, activityToUpdate: ActivityRequestDTO) {
    return update("activity", id, activityToUpdate)
}

export async function deleteActivity(id: number) {
    return deleteOne("activity", id)
}