import GrantDTO from '../dtos/GrantDTO';
import GrantRequestDTO from '../dtos/GrantRequestDTO';
import { add, deleteOne, get, getAll, update } from './crudService';

export const getAllGrants = async (orderBy?: string): Promise<GrantDTO[]> => {
    return getAll("grant", orderBy)
}

export const getGrantById = async (id: number): Promise<GrantDTO> => {
    return get("grant", id)
}

export const addGrant = async (grantToAdd: GrantRequestDTO) => {
    return add("grant", grantToAdd)
}

export const updateGrant = async (id: number, grantToUpdate: GrantRequestDTO) => {
    return update("grant", id, grantToUpdate)
}

export const deleteGrant = async (id: number) => {
    return deleteOne("grant", id)
}