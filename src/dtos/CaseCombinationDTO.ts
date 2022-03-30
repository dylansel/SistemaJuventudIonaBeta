import PricingCaseDTO from "./PricingCaseDTO";

export default interface CaseCombinationDTO {
    families: string[],
    pricingCases: PricingCaseDTO[]
}