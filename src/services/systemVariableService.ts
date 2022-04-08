import axios from 'axios';
import SystemVariableDTO from '../dtos/systemVariableDTO';
import { add, deleteOne, getAll, update } from './crudService';


export const getAllSystemVariable = async (orderBy?: string): Promise<SystemVariableDTO[]> => {
    return getAll("systemVariable", orderBy)
}

export const getSystemVariableByKey = async (key: string): Promise<SystemVariableDTO> => {
    try {
        const response = await axios(`${process.env.REACT_APP_BACKEND_DOMAIN!}/systemVariable/get/${key}`)
        const data = await response.data
        return data as SystemVariableDTO
    } catch (error: any) {
        throw error
    }
}

export const addSystemVariable = async (systemVariableToAdd: SystemVariableDTO) => {
    return add("systemVariable", systemVariableToAdd)
}

export const updateSystemVariable = async (key: string, systemVariableToUpdate: SystemVariableDTO) => {
    return update("systemVariable", key, systemVariableToUpdate)
}

export const deleteSystemVariable = async (key: string) => {
    return deleteOne("systemVariable", key)
}