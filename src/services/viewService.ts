import { getAllFamiliesWithChildren } from './familyService';
import { getAllGroups } from './groupService';
import { getJanijById } from './janijService';

export async function getAddJanijData(): Promise<any> {
    try {
        const groups = await getAllGroups()
        const families = await getAllFamiliesWithChildren("sort=surname,asc")
        return {
            groups,
            families
        }
    } catch (error: any) {
        throw error
    }
}

export async function getEditJanijData(id: number): Promise<any> {
    try {
        const groups = await getAllGroups()
        const families = await getAllFamiliesWithChildren("sort=surname,asc")
        const janijData = await getJanijById(id)
        return {
            groups,
            families,
            janijData
        }
    } catch (error: any) {
        throw error
    }
}