import SpecialPriceDTO from '../dtos/SpecialPriceDTO';
import SpecialPriceRequestDTO from '../dtos/SpecialPriceRequestDTO';
import { add, deleteOne, get, getAll, switchActive, update } from './crudService';

export const getAllSpecialPrice = async (orderBy?: string): Promise<SpecialPriceDTO[]> => {
    return getAll("specialPrice", orderBy)
}

export const getSpecialPriceById = async (id: number): Promise<SpecialPriceDTO> => {
    return get("specialPrice", id)
}

export const addSpecialPrice = async (areaToAdd: SpecialPriceRequestDTO) => {
    return add("specialPrice", areaToAdd)
}

export const updateSpecialPrice = async (id: number, areaToUpdate: SpecialPriceRequestDTO) => {
    return update("specialPrice", id, areaToUpdate)
}
/*
export const switchActiveSpecialPrice = async (id: number, active: boolean) => {
    return switchActive("specialPrice", id, active)
}
*/
export const deleteSpecialPrice = async (id: number) => {
    return deleteOne("specialPrice", id)
}