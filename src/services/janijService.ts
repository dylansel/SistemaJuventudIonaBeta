import axios from 'axios';
import JanijDTO from '../dtos/JanijDTO';
import JanijRequestDTO from '../dtos/JanijRequestDTO';
import { add, deleteOne, get, switchActive, update } from './crudService';

export async function getAllJanijim(orderBy?: string) {
    const response = await axios(`${process.env.REACT_APP_BACKEND_DOMAIN}/janij/getAll?${orderBy}`)
    const data = await response.data
    return data
}

export async function getJanijById(id: number){
    return get("janij", id)
}

export async function addJanij(janijToAdd: JanijRequestDTO) {
    return add("janij", janijToAdd)
}

export async function updateJanij(id: number, janijToUpdate: JanijRequestDTO) {
    return update("janij", id, janijToUpdate)
}

export async function switchActiveJanij(id: number, active: boolean) {
    return switchActive("janij", id, active)
}

export async function deleteJanij(id: number) {
    return deleteOne("janij", id)
}