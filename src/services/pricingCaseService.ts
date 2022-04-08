import axios from "axios"
import CaseCombinationDTO from "../dtos/CaseCombinationDTO"
import PricingCaseDTO from "../dtos/PricingCaseDTO"
import PricingCaseGroupDTO from "../dtos/PricingCaseGroupDTO"
import PricingCaseRequestDTO from "../dtos/PricingCaseRequestDTO"

export const getActive = async (): Promise<PricingCaseDTO[]> => {
    try {
        const response = await axios(`${process.env.REACT_APP_BACKEND_DOMAIN}/pricingCase/getActive`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export const getCaseCombinations = async (): Promise<CaseCombinationDTO[]> => {
    try {
        const response = await axios(`${process.env.REACT_APP_BACKEND_DOMAIN}/pricingCase/getCaseCombinations`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export const getGroupCases = async (): Promise<PricingCaseGroupDTO[]> => {
    try {
        const response = await axios(`${process.env.REACT_APP_BACKEND_DOMAIN}/pricingCase/getGroupCases`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export const savePricingCases = async (pricingCaseRequestDTOS: PricingCaseRequestDTO[]) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_DOMAIN}/pricingCase/save`, pricingCaseRequestDTOS)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}