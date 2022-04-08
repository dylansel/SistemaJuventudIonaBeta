import FamilyDTO from '../dtos/FamilyDTO';
import FamilyRequestDTO from '../dtos/FamilyRequestDTO';
import { add, deleteOne, get, getAll, switchActive, update } from './crudService';

export async function getAllFamilies(orderBy?: string) {
    return getAll("family", orderBy)
}

export async function getAllFamiliesWithChildren(orderBy?: string) {
    try {
        const data = await getAllFamilies(orderBy)
        data.forEach((family: any) => {
            let fullFamily = family.surname + " ("
            if (family.janijim.length > 0) {
                for (let i = 0; i < family.janijim.length; i++) {
                    fullFamily += family.janijim[i].name + (i !== family.janijim.length - 1 ? "," : ")")
                }
                family["fullFamily"] = fullFamily
            } else {
                family["fullFamily"] = fullFamily + "sin hijos)"
            }
        })
        return data
    } catch (error: any) {
        throw error
    }
}

export const getFamilyById = async (id: number): Promise<FamilyDTO> => {
    return get("family", id)
}

export const addFamily = async (familyToAdd: FamilyRequestDTO) => {
    return add("family", familyToAdd)
}

export const updateFamily = async (id: number, familyToUpdate: FamilyRequestDTO) => {
    return update("family", id, familyToUpdate)
}

export const switchActiveFamily = async (id: number, active: boolean) => {
    return switchActive("family", id, active)
}

export const deleteFamily = async (id: number) => {
    return deleteOne("family", id)
}