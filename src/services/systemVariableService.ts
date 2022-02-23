import axios from 'axios';
import systemVariableDTO from '../dtos/systemVariableDTO';


export async function getAllsystemVariable(orderBy?: string): Promise<systemVariableDTO[]> {
    try {
        const response = await axios(`${process.env.REACT_APP_BACKEND_DOMAIN!}/systemVariable/getAll?${orderBy}`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function getSystemVariableBykey(key: String): Promise<systemVariableDTO> {
    try {
        const response = await axios(`${process.env.REACT_APP_BACKEND_DOMAIN!}/systemVariable/get/${key}`)
        const data = await response.data
        return data as systemVariableDTO
    } catch (error: any) {
        throw error
    }
}

export async function addSystemVariable(systemVariableToAdd: systemVariableDTO) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_DOMAIN}/systemVariable/add`,systemVariableToAdd)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function updateSystemVariable(key: String, systemVariableToUpdate: systemVariableDTO) {
    try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_DOMAIN!}/systemVariable/update/${key}`,systemVariableToUpdate)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}


export async function deleteSystemVariable(key: String) {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_DOMAIN!}/systemVariable/delete/${key}`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}