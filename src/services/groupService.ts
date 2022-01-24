import { BACKEND_URL } from '../constants/globals';
import axios from 'axios';
import GroupDTO from '../dtos/GroupDTO';
import GroupRequestDTO from '../dtos/GroupRequestDTO';

export async function getAllGroups(orderBy?: string): Promise<GroupDTO[]> {
    try {
        const response = await axios(`${BACKEND_URL}/group/getAll?${orderBy}`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function getGroupById(ID: number): Promise<GroupDTO> {
    try {
        const response = await axios(`${BACKEND_URL}/group/get/${ID}`)
        const data = await response.data
        return data as GroupDTO
    } catch (error: any) {
        throw error
    }
}

export async function addGroup(groupToAdd: GroupRequestDTO) {
    try {
        const response = await axios.post(`${BACKEND_URL}/group/add`, groupToAdd)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function updateGroup(ID: number, groupToUpdate: GroupRequestDTO) {
    try {
        const response = await axios.put(`${BACKEND_URL}/group/update/${ID}`, groupToUpdate)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function deleteGroup(ID: number) {
    try {
        const response = await axios.delete(`${BACKEND_URL}/group/delete/${ID}`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}