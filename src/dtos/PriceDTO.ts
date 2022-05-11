export default interface PriceDTO {
    id: number,
    amount: number,
    month: string,
    pricingCasePrices: PricingCasePriceDTO[]
}

export interface PricingCasePriceDTO {
    pricingCase: PricingCaseDTO
}

interface PricingCaseDTO {
    id: number,
    name: string,
    active: boolean
}