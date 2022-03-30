import axios from "axios"
import PricingCaseRequestDTO from "../dtos/PricingCaseRequestDTO"

export async function getActive() {
    try {
        const response = await axios(`${process.env.REACT_APP_BACKEND_DOMAIN}/pricingCase/getActive`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function getCaseCombinations() {
    try {
        const response = await axios(`${process.env.REACT_APP_BACKEND_DOMAIN}/pricingCase/getCaseCombinations`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function getGroupCases() {
    try {
        const response = await axios(`${process.env.REACT_APP_BACKEND_DOMAIN}/pricingCase/getGroupCases`)
        const data = await response.data
        console.log(data)
        return data
    } catch (error: any) {
        throw error
    }
}

export async function save(pricingCaseRequestDTOS: PricingCaseRequestDTO[]) {
    try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_DOMAIN}/pricingCase/save`, pricingCaseRequestDTOS)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}