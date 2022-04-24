import GroupDTO from '../dtos/GroupDTO';
import GroupRequestDTO from '../dtos/GroupRequestDTO';
import { add, deleteOne, get, getAll, switchActive, update } from './crudService';

export const getAllGroups = async (orderBy?: string): Promise<GroupDTO[]> => {
    return getAll("group", orderBy)
}

export const getGroupById = async (id: number): Promise<GroupDTO> => {
    return get("group", id)
}

export const addGroup = async (groupToAdd: GroupRequestDTO) => {
    return add("group", groupToAdd)
}

export const updateGroup = async (id: number, groupToUpdate: GroupRequestDTO) => {
    return update("group", id, groupToUpdate)
}

export const switchActiveGroup = async (id: number, active: boolean) => {
    return switchActive("group", id, active)
}

export const deleteGroup = async (id: number) => {
    return deleteOne("group", id)
}