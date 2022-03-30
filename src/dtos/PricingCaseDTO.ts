import PricingCaseGroupDTO from "./PricingCaseGroupDTO";

export default interface PricingCaseDTO {
    name: string,
    pricingCaseGroups: PricingCaseGroupDTO[]
}