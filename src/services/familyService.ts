import { BACKEND_URL } from '../constants/globals';
import axios from 'axios';

export async function getAllFamilies(): Promise<any[]> {
    try {
        let response = await axios(`${BACKEND_URL}/janij/getAll`)
        let data = await response.data
        let families: any[] = []
        data.forEach((family: string) => {
            families.push(family)
        });
        return families.filter(function(elem, index, self) {
            return index === self.indexOf(elem);
        })
    } catch (error: any) {
        throw error
    }
}