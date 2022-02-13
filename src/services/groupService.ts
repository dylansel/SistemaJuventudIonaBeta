import axios from 'axios';
import GroupDTO from '../dtos/GroupDTO';
import GroupRequestDTO from '../dtos/GroupRequestDTO';

export async function getAllGroups(orderBy?: string): Promise<GroupDTO[]> {
    try {
        const response = await axios(`${process.env.BACKEND_DOMAIN}/group/getAll?${orderBy}`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function getGroupById(ID: number): Promise<GroupDTO> {
    try {
        const response = await axios(`${process.env.BACKEND_DOMAIN}/group/get/${ID}`)
        const data = await response.data
        return data as GroupDTO
    } catch (error: any) {
        throw error
    }
}

export async function addGroup(groupToAdd: GroupRequestDTO) {
    try {
        const response = await axios.post(`${process.env.BACKEND_DOMAIN}/group/add`, groupToAdd)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function updateGroup(ID: number, groupToUpdate: GroupRequestDTO) {
    try {
        const response = await axios.put(`${process.env.BACKEND_DOMAIN}/group/update/${ID}`, groupToUpdate)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function switchActiveGroup(id: number, active: boolean) {
    try {
        const response = await axios.put(`${process.env.BACKEND_DOMAIN}/group/update/${id}`, { active })
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function deleteGroup(ID: number) {
    try {
        const response = await axios.delete(`${process.env.BACKEND_DOMAIN}/group/delete/${ID}`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}