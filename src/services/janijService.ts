import axios from 'axios';
import { BACKEND_URL } from '../constants/globals';
import JanijDTO from '../dtos/JanijDTO';
import JanijRequestDTO from '../dtos/JanijRequestDTO';

export async function getAllJanijim(orderBy?: string): Promise<JanijDTO[]> {
    try {
        const response = await axios(`${BACKEND_URL}/janij/getAll?${orderBy}`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function getJanijById(id: number): Promise<JanijDTO> {
    try {
        const response = await axios(`${BACKEND_URL}/janij/get/${id}`)
        const data = await response.data
        return data as JanijDTO
    } catch (error: any) {
        throw error
    }
}

export async function addJanij(janijToAdd: JanijRequestDTO) {
    try {
        const response = await axios.post(`${BACKEND_URL}/janij/add`, janijToAdd)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function updateJanij(id: number, janijToUpdate: JanijRequestDTO) {
    try {
        const response = await axios.put(`${BACKEND_URL}/janij/update/${id}`, janijToUpdate)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function switchActiveJanij(id: number, active: boolean) {
    try {
        const response = await axios.put(`${BACKEND_URL}/janij/update/${id}`, { active })
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function deleteJanij(id: number) {
    try {
        const response = await axios.delete(`${BACKEND_URL}/janij/delete/${id}`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}