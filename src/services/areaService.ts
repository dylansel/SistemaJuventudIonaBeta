import AreaDTO from '../dtos/AreaDTO';
import AreaRequestDTO from '../dtos/AreaRequestDTO';
import { add, deleteOne, get, getAll, switchActive, update } from './crudService';

export async function getAllAreas(orderBy?: string): Promise<AreaDTO[]> {
    return getAll("area", orderBy)
}

export async function getAreaById(id: number): Promise<AreaDTO> {
    return get("area", id)
}

export async function addArea(areaToAdd: AreaRequestDTO) {
    return add("area", areaToAdd)
}

export async function updateArea(id: number, areaToUpdate: AreaRequestDTO) {
    return update("area", id, areaToUpdate)
}

export async function switchActiveArea(id: number, active: boolean) {
    return switchActive("area", id, active)
}

export async function deleteArea(id: number) {
    return deleteOne("area", id)
}