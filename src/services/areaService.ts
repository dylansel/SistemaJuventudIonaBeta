import AreaDTO from '../dtos/AreaDTO';
import AreaRequestDTO from '../dtos/AreaRequestDTO';
import { add, deleteOne, get, getAll, switchActive, update } from './crudService';

export const getAllAreas = async (orderBy?: string): Promise<AreaDTO[]> => {
    return getAll("area", orderBy)
}

export const getAreaById = async (id: number): Promise<AreaDTO> => {
    return get("area", id)
}

export const addArea = async (areaToAdd: AreaRequestDTO) => {
    return add("area", areaToAdd)
}

export const updateArea = async (id: number, areaToUpdate: AreaRequestDTO) => {
    return update("area", id, areaToUpdate)
}

export const switchActiveArea = async (id: number, active: boolean) => {
    return switchActive("area", id, active)
}

export const deleteArea = async (id: number) => {
    return deleteOne("area", id)
}