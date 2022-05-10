export default interface PricingCaseDTO {
    name: string,
    pricingCaseGroups: PricingCaseGroupDTO[]
}

export interface PricingCaseGroupDTO {
    group: GroupDTO,
    leadersCourse: boolean
}

interface GroupDTO {
    id: number,
    name: string    
}