import axios from 'axios';
import FamilyRequestDTO from '../dtos/FamilyRequestDTO';

export async function getAllFamilies(orderBy?: string): Promise<any[]> {
    try {
        const response = await axios(`${process.env.REACT_APP_BACKEND_DOMAIN}/family/getAll?${orderBy}`)
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
    try {
        const response = await axios(`${process.env.REACT_APP_BACKEND_DOMAIN}/family/get/${id}`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function addFamily(familyToAdd: FamilyRequestDTO) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_DOMAIN}/family/add`, familyToAdd)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function updateFamily(id: number, familyToUpdate: FamilyRequestDTO) {
    try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_DOMAIN}/family/update/${id}`, familyToUpdate)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function switchActiveFamily(id: number, active: boolean) {
    try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_DOMAIN}/family/update/${id}`, { active })
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function deleteFamily(id: number) {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_DOMAIN}/family/delete/${id}`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}