import { getAllAreas } from './areaService';
import { getAllFamiliesWithChildren } from './familyService';
import { getAllGroups, getGroupById } from './groupService';
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

export async function getAddGroupData(): Promise<any> {
    try {
        const areas = await getAllAreas()
        return {
            areas
        }
    } catch (error: any) {
        throw error
    }
}

export async function getEditGroupData(id: number): Promise<any> {
    try {
        const areas = await getAllAreas()
        const groupData = await getGroupById(id)
        return {
            areas,
            groupData
        }
    } catch (error: any) {
        throw error
    }
}
