import GroupDTO from '../dtos/GroupDTO';
import GroupRequestDTO from '../dtos/GroupRequestDTO';
import axios from 'axios'
import { add, deleteOne, get, getAll, switchActive, update } from './crudService';

export const getAllGroups = async (orderBy?: string): Promise<any[]> => {
    const response = await axios(`${process.env.REACT_APP_BACKEND_DOMAIN}?action=groups&${process.env.REACT_APP_BACKEND_AUTH}`)
    const data = await response.data.content
    return data
    
}

export const getGroupById = async (id: number): Promise<GroupDTO> => {
    return get("group", id)
}

export const addGroup = async (groupToAdd: GroupRequestDTO) => {
    return add("group", groupToAdd)
}

export const updateGroup = async (id: number, groupToUpdate: GroupRequestDTO) => {
    return update("group", id, groupToUpdate)
}

export const switchActiveGroup = async (id: number, active: boolean) => {
    return switchActive("group", id, active)
}

export const deleteGroup = async (id: number) => {
    return deleteOne("group", id)
}