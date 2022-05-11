export default interface GroupDTO {
    id: number,
    active: boolean,
    name: string,
    ordinal: number,
    area: AreaDTO
}

interface AreaDTO {
    id: number,
    name: string
}