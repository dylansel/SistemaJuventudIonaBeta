import axios from 'axios';
import ActivityDTO from '../dtos/ActivityDTO';
import ActivityRequestDTO from '../dtos/ActivityRequestDTO';
import MultipleActivitiesRequestDTO from '../dtos/MultipleActivitiesRequestDTO';
import { add, deleteOne, get, getAll, update } from './crudService';
import { getCredentials } from "../auth/authUtils";

const credentials = getCredentials();

export const getAllActivities = async (sort = true): Promise<any[]> => {
  try {
    const response = await axios(
      `${process.env.REACT_APP_BACKEND_DOMAIN}?action=activities&${credentials}`
    );
    let data = await response.data.content;
    if(sort)data =  data.sort((a:any, b:any) => new Date(b).getTime() - new Date(a).getTime())
    return data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};


export const getActivityById = async (id: number): Promise<ActivityDTO> => {
    return get("activity", id)
}

export const addActivity = async (activityToAdd: ActivityRequestDTO) => {
    return add("activity", activityToAdd)
}

export const addMultipleActivities = async (requestDTO: MultipleActivitiesRequestDTO) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_DOMAIN}/activity/addMultiple`, requestDTO)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export const updateActivity = async (id: number, activityToUpdate: ActivityRequestDTO) => {
    return update("activity", id, activityToUpdate)
}

export const deleteActivity = async (id: number) => {
    return deleteOne("activity", id)
}