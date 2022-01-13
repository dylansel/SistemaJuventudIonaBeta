import { BACKEND_URL } from '../constants/globals';
import axios from 'axios';
import AreaDTO from '../interfaces/AreaDTO';

export async function getAllAreas(): Promise<AreaDTO[]> {
    try {
        let response = await axios(`${BACKEND_URL}/area/getAll`)
        let data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function getAreaById(ID: number): Promise<AreaDTO> {
    try {
        let response = await axios(`${BACKEND_URL}/area/get/${ID}`)
        let data = await response.data
        return data as AreaDTO
    } catch (error: any) {
        throw error
    }
}

export async function addArea(areaToAdd: AreaDTO) {
    try {
        let response = await axios.post(`${BACKEND_URL}/area/add`,areaToAdd)
        let data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function updateArea(ID: number, areaToUpdate: AreaDTO) {
    try {
        let response = await axios.put(`${BACKEND_URL}/area/update/${ID}`,areaToUpdate)
        let data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function deleteArea(ID: number) {
    try {
        let response = await axios.delete(`${BACKEND_URL}/area/delete/${ID}`)
        let data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}