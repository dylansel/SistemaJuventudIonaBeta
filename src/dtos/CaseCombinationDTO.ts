export default interface CaseCombinationDTO {
    families: string[],
    pricingCases: PricingCaseDTO[]
}

export interface PricingCaseDTO {
    id: number,
    name: string
}