import { BACKEND_URL } from '../constants/globals';
import axios from 'axios';
import FamilyRequestDTO from '../dtos/FamilyRequestDTO';

export async function getAllFamilies(orderBy?: string): Promise<any[]> {
    try {
        const response = await axios(`${BACKEND_URL}/family/getAll?${orderBy}`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function getAllFamiliesWithChildren(orderBy?: string): Promise<any[]> {
    try {
        const data = await getAllFamilies(orderBy)
        data.forEach((family: any) => {
            let janijimNames = family.surname + " ("
            for (let i = 0; i < family.janijim.length; i++) {
                janijimNames += family.janijim[i].name + (i !== family.janijim.length - 1 ? "," : ")")
            }
            family["fullFamily"] = janijimNames
        })
        return data
    } catch (error: any) {
        throw error
    }
}


export async function getFamilyById(id: number): Promise<any[]> {
    try {
        const response = await axios(`${BACKEND_URL}/family/get/${id}`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function addFamily(familyToAdd: FamilyRequestDTO) {
    try {
        const response = await axios.post(`${BACKEND_URL}/family/add`, familyToAdd)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function updateFamily(id: number, familyToUpdate: FamilyRequestDTO) {
    try {
        const response = await axios.put(`${BACKEND_URL}/family/update/${id}`, familyToUpdate)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function deleteFamily(id: number) {
    try {
        const response = await axios.delete(`${BACKEND_URL}/family/delete/${id}`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}