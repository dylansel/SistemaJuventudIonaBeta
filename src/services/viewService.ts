import { getAllAreas } from './areaService';
import { getAllFamiliesWithChildren } from './familyService';
import { getAllGroups, getGroupById } from './groupService';
import { getJanijById } from './janijService';

export const getAddJanijData = async () => {
    try {
        const groups = await getAllGroups("sort=ordinal,asc")
        const families = await getAllFamiliesWithChildren("sort=surname,asc")
        return {
            groups,
            families
        }
    } catch (error: any) {
        throw error
    }
}

export const getEditJanijData = async (id: number) => {
    try {
        const groups = await getAllGroups("sort=ordinal,asc")
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

export const getAddGroupData = async () => {
    try {
        const areas = await getAllAreas("sort=ordinal,asc")
        return {
            areas
        }
    } catch (error: any) {
        throw error
    }
}

export const getEditGroupData = async (id: number) => {
    try {
        const areas = await getAllAreas("sort=ordinal,asc")
        const groupData = await getGroupById(id)
        return {
            areas,
            groupData
        }
    } catch (error: any) {
        throw error
    }
}
