import axios from 'axios';
import JanijDTO from '../dtos/JanijDTO';
import JanijRequestDTO from '../dtos/JanijRequestDTO';
import { add, deleteOne, get, switchActive, update } from './crudService';

export const getAllJanijim = async (orderBy?: string): Promise<JanijDTO[]> => {
    const response = await axios(`${process.env.REACT_APP_BACKEND_DOMAIN}/janij/getAll?${orderBy}`)
    const data = await response.data
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

export const deleteJanij = async (id: number) => {
    return deleteOne("janij", id)
}