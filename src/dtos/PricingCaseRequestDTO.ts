export default interface PricingCaseRequestDTO {
    name: string,
    pricingCaseGroups: PricingCaseGroupRequestDTO[]
}

interface PricingCaseGroupRequestDTO {
    groupId: number,
    leadersCourse: boolean
}