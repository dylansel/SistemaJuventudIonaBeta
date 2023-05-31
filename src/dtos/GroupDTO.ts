export default interface GroupDTO {
    name: string,
    area: AreaDTO
}

interface AreaDTO {
    id: number,
    name: string
}