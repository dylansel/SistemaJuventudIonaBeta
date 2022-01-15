import { BACKEND_URL } from '../constants/globals';
import axios from 'axios';
import { families } from '../utils/data/fakeFamiliesData';

export async function getAllFamilies(): Promise<any[]> {
    try {
        //const response = await axios(`${BACKEND_URL}/family/getAll`)
        //const data = await response.data
        return families
    } catch (error: any) {
        throw error
    }
}

export async function addFamily(familyToAdd: string) {
    try {
        //const response = await axios.post(`${BACKEND_URL}/family/add`, familyToAdd)
        // data = await response.data
        //return data
        return
    } catch (error: any) {
        throw error
    }
}