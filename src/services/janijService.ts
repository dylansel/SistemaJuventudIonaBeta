import axios from 'axios';
import { BACKEND_URL } from '../constants/globals';
import JanijDTO from '../interfaces/JanijDTO';

export async function getAllJanijim(): Promise<JanijDTO[]> {
    try {
        let response = await axios(`${BACKEND_URL}/janij/getAll`)
        let data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function getJanijById(ID: number): Promise<JanijDTO> {
    try {
        let response = await axios(`${BACKEND_URL}/janij/get/${ID}`)
        let data = await response.data
        return data as JanijDTO
    } catch (error: any) {
        throw error
    }
}

export async function addJanij(janijToAdd: JanijDTO) {
    try {
        let response = await axios.post(`${BACKEND_URL}/janij/add`,janijToAdd)
        let data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function updateJanij(ID: number, janijToUpdate: JanijDTO) {
    try {
        let response = await axios.put(`${BACKEND_URL}/janij/update/${ID}`,janijToUpdate)
        let data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function deleteJanij(ID: number) {
    try {
        let response = await axios.delete(`${BACKEND_URL}/janij/delete/${ID}`)
        let data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}