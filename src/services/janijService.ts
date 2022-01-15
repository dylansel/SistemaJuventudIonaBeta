import axios from 'axios';
import { BACKEND_URL } from '../constants/globals';
import JanijDTO from '../dtos/JanijDTO';
import JanijRequestDTO from '../dtos/JanijRequestDTO';

export async function getAllJanijim(): Promise<JanijDTO[]> {
    try {
        const response = await axios(`${BACKEND_URL}/janij/getAll`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function getJanijById(ID: number): Promise<JanijDTO> {
    try {
        const response = await axios(`${BACKEND_URL}/janij/get/${ID}`)
        const data = await response.data
        return data as JanijDTO
    } catch (error: any) {
        throw error
    }
}

export async function addJanij(janijToAdd: JanijRequestDTO) {
    try {
        const response = await axios.post(`${BACKEND_URL}/janij/add`,janijToAdd)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function updateJanij(ID: number, janijToUpdate: JanijDTO) {
    try {
        const response = await axios.put(`${BACKEND_URL}/janij/update/${ID}`,janijToUpdate)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function deleteJanij(ID: number) {
    try {
        const response = await axios.delete(`${BACKEND_URL}/janij/delete/${ID}`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}