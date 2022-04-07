import GroupRequestDTO from '../dtos/GroupRequestDTO';
import { add, deleteOne, get, getAll, switchActive, update } from './crudService';

export async function getAllGroups(orderBy?: string) {
    return getAll("group", orderBy)
}

export async function getGroupById(id: number) {
    return get("group", id)
}

export async function addGroup(groupToAdd: GroupRequestDTO) {
    return add("group", groupToAdd)
}

export async function updateGroup(id: number, groupToUpdate: GroupRequestDTO) {
    return update("group", id, groupToUpdate)
}

export async function switchActiveGroup(id: number, active: boolean) {
    return switchActive("group", id, active)
}

export async function deleteGroup(id: number) {
    return deleteOne("group", id)
}