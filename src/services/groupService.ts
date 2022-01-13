import { BACKEND_URL } from '../constants/globals';
import axios from 'axios';
import GroupDTO from '../interfaces/GroupDTO';

export async function getAllGroups(): Promise<GroupDTO[]> {
    try {
        let response = await axios(`${BACKEND_URL}/group/getAll`)
        let data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function getGroupById(ID: number): Promise<GroupDTO> {
    try {
        let response = await axios(`${BACKEND_URL}/group/get/${ID}`)
        let data = await response.data
        return data as GroupDTO
    } catch (error: any) {
        throw error
    }
}

export async function addGroup(groupToAdd: GroupDTO) {
    try {
        let response = await axios.post(`${BACKEND_URL}/group/add`,groupToAdd)
        let data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function updateGroup(ID: number, groupToUpdate: GroupDTO) {
    try {
        let response = await axios.put(`${BACKEND_URL}/group/update/${ID}`,groupToUpdate)
        let data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function deleteGroup(ID: number) {
    try {
        let response = await axios.delete(`${BACKEND_URL}/group/delete/${ID}`)
        let data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}