import axios from 'axios';
import JanijDTO from '../dtos/JanijDTO';
import JanijRequestDTO from '../dtos/JanijRequestDTO';

export async function getAllJanijim(orderBy?: string): Promise<JanijDTO[]> {
    const response = await axios(`${process.env.REACT_APP_BACKEND_DOMAIN}/janij/getAll?${orderBy}`)
    const data = await response.data
    return data
}

export async function getJanijById(id: number): Promise<JanijDTO> {
    try {
        const response = await axios(`${process.env.REACT_APP_BACKEND_DOMAIN}/janij/get/${id}`)
        const data = await response.data
        return data as JanijDTO
    } catch (error: any) {
        throw error
    }
}

export async function addJanij(janijToAdd: JanijRequestDTO) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_DOMAIN}/janij/add`, janijToAdd)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function updateJanij(id: number, janijToUpdate: JanijRequestDTO) {
    try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_DOMAIN!}/janij/update/${id}`, janijToUpdate)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function switchActiveJanij(id: number, active: boolean) {
    try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_DOMAIN}/janij/update/${id}`, { active })
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function deleteJanij(id: number) {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_DOMAIN}/janij/delete/${id}`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}