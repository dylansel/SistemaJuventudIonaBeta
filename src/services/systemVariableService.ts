import axios from 'axios';
import SystemVariableDTO from '../dtos/systemVariableDTO';
import { add, getAll } from './crudService';


export async function getAllSystemVariable(orderBy?: string): Promise<SystemVariableDTO[]> {
    return getAll("systemVariable", orderBy)
}

export async function getSystemVariableByKey(key: string): Promise<SystemVariableDTO> {
    try {
        const response = await axios(`${process.env.REACT_APP_BACKEND_DOMAIN!}/systemVariable/get/${key}`)
        const data = await response.data
        return data as SystemVariableDTO
    } catch (error: any) {
        throw error
    }
}

export async function addSystemVariable(systemVariableToAdd: SystemVariableDTO) {
    return add("systemVariable", systemVariableToAdd)
}

export async function updateSystemVariable(key: string, systemVariableToUpdate: SystemVariableDTO) {
    try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_DOMAIN!}/systemVariable/update/${key}`, systemVariableToUpdate)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function deleteSystemVariable(key: string) {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_DOMAIN!}/systemVariable/delete/${key}`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}