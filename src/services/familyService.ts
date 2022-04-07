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

export async function getFamilyById(id: number): Promise<any[]> {
    return get("family", id)
}

export async function addFamily(familyToAdd: FamilyRequestDTO) {
    return add("family", familyToAdd)
}

export async function updateFamily(id: number, familyToUpdate: FamilyRequestDTO) {
    return update("family", id, familyToUpdate)
}

export async function switchActiveFamily(id: number, active: boolean) {
    return switchActive("family", id, active)
}

export async function deleteFamily(id: number) {
    return deleteOne("family", id)
}