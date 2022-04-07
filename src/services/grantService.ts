import GrantRequestDTO from '../dtos/GrantRequestDTO';
import { add, deleteOne, get, getAll, update } from './crudService';

export async function getAllGrants(orderBy?: string) {
    return getAll("grant", orderBy)
}

export async function getGrantById(id: number) {
    return get("grant", id)
}

export async function addGrant(grantToAdd: GrantRequestDTO) {
    return add("grant", grantToAdd)
}

export async function updateGrant(id: number, grantToUpdate: GrantRequestDTO) {
    return update("grant", id, grantToUpdate)
}

export async function deleteGrant(id: number) {
    return deleteOne("grant", id)
}