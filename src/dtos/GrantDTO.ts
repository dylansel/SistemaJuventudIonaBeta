export default interface GrantDTO {
    id: number,
    family: FamilyDTO,
    percentile: number,
    since: string,
    until: string
}
interface FamilyDTO { 
    id: number,
    surname: string
}