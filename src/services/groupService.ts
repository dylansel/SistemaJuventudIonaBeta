import { BACKEND_URL } from '../constants/globals';
import axios from 'axios';
import GroupDTO from '../interfaces/GroupDTO';

export async function getGroups(): Promise<GroupDTO[]> {
    try {
        let response = await axios(`${BACKEND_URL}/group/getAll`)
        let data = await response.data;
        return data;
    } catch (error: any) {
        throw error
    }
}