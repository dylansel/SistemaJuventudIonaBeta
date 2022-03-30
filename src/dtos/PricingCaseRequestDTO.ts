import PricingCaseGroupRequestDTO from "./PricingCaseGroupRequestDTO";

export default interface PricingCaseRequestDTO {
    name: string,
    pricingCaseGroups: PricingCaseGroupRequestDTO[]
}