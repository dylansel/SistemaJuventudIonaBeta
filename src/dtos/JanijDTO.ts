export default interface JanijDTO {
    id: number,
    active: boolean,
    name: string,
    leadersCourse: boolean,
    family: FamilyDTO,
    group: GroupDTO
}

interface FamilyDTO {
    id: number,
    surname: string
}

interface GroupDTO {
    id: number,
    name: string
}