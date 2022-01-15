import { BACKEND_URL } from '../constants/globals';
import axios from 'axios';

export async function getAllFamilies(): Promise<any[]> {
    try {
        const response = await axios(`${BACKEND_URL}/family/getAll`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function getFamiliesLastId(): Promise<number> {
    try {
        const response: any = await getAllFamilies()
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}