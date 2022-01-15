import { getAllFamilies } from './familyService';
import { getAllGroups } from './groupService';
import { getJanijById } from './janijService';


export async function getAddJanijData(): Promise<any> {
    try {
        const groups = await getAllGroups()
        const families= await getAllFamilies()
        return {
            groups,
           families
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