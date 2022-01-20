import { BACKEND_URL } from '../constants/globals';
import axios from 'axios';
import AreaDTO from '../dtos/AreaDTO';

export async function getAllAreas(orderBy?: string): Promise<AreaDTO[]> {
    try {
        const response = await axios(`${BACKEND_URL}/area/getAll?${orderBy}`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function getAreaById(id: number): Promise<AreaDTO> {
    try {
        const response = await axios(`${BACKEND_URL}/area/get/${id}`)
        const data = await response.data
        return data as AreaDTO
    } catch (error: any) {
        throw error
    }
}

export async function addArea(areaToAdd: AreaDTO) {
    try {
        const response = await axios.post(`${BACKEND_URL}/area/add`,areaToAdd)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function updateArea(id: number, areaToUpdate: AreaDTO) {
    try {
        const response = await axios.put(`${BACKEND_URL}/area/update/${id}`,areaToUpdate)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function deleteArea(id: number) {
    try {
        const response = await axios.delete(`${BACKEND_URL}/area/delete/${id}`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}