import PriceCombinationCaseDTO from "./PriceCombinationCaseDTO";
import { PricingCasePriceDTO } from "./PricingCasePriceDTO";

export interface PriceDTO {
    id: number,
    amount: number,
    month: string,
    pricingCasePrices?: PricingCasePriceDTO[],
    pricingCombinations?: PriceCombinationCaseDTO[]
}