import { BACKEND_URL } from '../constants/globals';
import axios from 'axios';
import AreaDTO from '../interfaces/AreaDTO';

export async function getAllAreas(): Promise<AreaDTO[]> {
    try {
        const response = await axios(`${BACKEND_URL}/area/getAll`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function getAreaById(ID: number): Promise<AreaDTO> {
    try {
        const response = await axios(`${BACKEND_URL}/area/get/${ID}`)
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

export async function updateArea(ID: number, areaToUpdate: AreaDTO) {
    try {
        const response = await axios.put(`${BACKEND_URL}/area/update/${ID}`,areaToUpdate)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function deleteArea(ID: number) {
    try {
        const response = await axios.delete(`${BACKEND_URL}/area/delete/${ID}`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}