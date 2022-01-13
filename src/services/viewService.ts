import { BACKEND_URL } from '../constants/globals';
import axios from 'axios';
import { getAllGroups } from './groupService';
import { getJanijById } from './janijService';

export async function getAddJanijData(): Promise<any> {
    try {
        const groups = await getAllGroups()
        return {
            groups,
        }
    } catch (error: any) {
        throw error
    }
}

export async function getEditJanijData(ID: number): Promise<any> {
    try {
        const groups = await getAllGroups()
        const janijData = await getJanijById(ID)
        return {
            groups,
            janijData
        }
    } catch (error: any) {
        throw error
    }
}