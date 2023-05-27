import axios from 'axios';
import JanijDTO from '../dtos/JanijDTO';
import JanijListDTO from '../dtos/JanijListDTO';
import JanijRequestDTO from '../dtos/JanijRequestDTO';
import { add, deleteOne, get, switchActive, update } from './crudService';

export const getAllJanijim = async (restricted: boolean = true): Promise<JanijListDTO[]> => {
    const response = await axios(`${process.env.REACT_APP_BACKEND_DOMAIN}?action=list&restricted=${(restricted)}&${process.env.REACT_APP_BACKEND_AUTH}`)
    const data = await response.data.content
    return data
}

export const getJanijById = async (id: number): Promise<JanijDTO> => {
    return get("janij", id)
}

export const addJanij = async (janijToAdd: JanijRequestDTO) => {
    return add("janij", janijToAdd)
}

export const updateJanij = async (id: number, janijToUpdate: JanijRequestDTO) => {
    return update("janij", id, janijToUpdate)
}

export const switchActiveJanij = async (id: number, active: boolean) => {
    return switchActive("janij", id, active)
}


export const deleteJanij = async (name:string) => {
    try {
        console.log(name)
        const response = await axios(`${process.env.REACT_APP_BACKEND_DOMAIN}?action=delete&name=${name?.replace(' ','%20')}&${process.env.REACT_APP_BACKEND_AUTH}`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}
