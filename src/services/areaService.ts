import axios from 'axios';
import AreaDTO from '../dtos/AreaDTO';
import AreaRequestDTO from '../dtos/AreaRequestDTO';

export async function getAllAreas(orderBy?: string): Promise<AreaDTO[]> {
    try {
        const response = await axios(`${process.env.REACT_APP_BACKEND_DOMAIN!}/area/getAll?${orderBy}`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function getAreaById(id: number): Promise<AreaDTO> {
    try {
        const response = await axios(`${process.env.REACT_APP_BACKEND_DOMAIN!}/area/get/${id}`)
        const data = await response.data
        return data as AreaDTO
    } catch (error: any) {
        throw error
    }
}

export async function addArea(areaToAdd: AreaRequestDTO) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_DOMAIN}/area/add`,areaToAdd)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function updateArea(id: number, areaToUpdate: AreaRequestDTO) {
    try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_DOMAIN!}/area/update/${id}`,areaToUpdate)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function switchActiveArea(id: number, active: boolean) {
    try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_DOMAIN!}/area/update/${id}`, { active })
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function deleteArea(id: number) {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_DOMAIN!}/area/delete/${id}`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}