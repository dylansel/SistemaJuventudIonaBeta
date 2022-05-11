export default interface FamilyDTO {
    id: number,
    active: boolean,
    surname: string,
    janijim: JanijDTO[]
}

export interface JanijDTO { 
    name: string,
    group: GroupDTO
}

interface GroupDTO {
    name: string
}