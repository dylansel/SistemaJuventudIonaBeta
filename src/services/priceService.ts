import axios from 'axios';
import PriceDTO from '../dtos/PriceDTO';
import { PriceRequestDTO } from '../dtos/PriceRequestDTO';
import { add, deleteOne, get, getAll, update } from './crudService';

export const getAllPrices = async (orderBy?: string): Promise<PriceDTO[]> => {
    return getAll("price", orderBy)
}

export const getPriceById = async (id: number): Promise<PriceDTO> => {
    return get("price", id)
}

export const getAllPricesByMonth = async (month: string): Promise<PriceDTO[]> => {
    try {
        const response = await axios(`${process.env.REACT_APP_BACKEND_DOMAIN}/price/getByMonth/${month}`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export const addPrice = async (priceToAdd: PriceRequestDTO) => {
    return add("price", priceToAdd)
}

export const addAllPrices = async (pricesToAdd: PriceRequestDTO[]) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_DOMAIN}/price/addAll`, pricesToAdd)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export const updatePrice = async (id: number, priceToUpdate: PriceRequestDTO) => {
    return update("price", id, priceToUpdate)
}

export const deletePrice = async (id: number) => {
    return deleteOne("price", id)
}

export const deletePricesByMonth = async (pricesByMonth: PriceDTO[]) => {
    for(const price of pricesByMonth){
        deleteOne("price", price.id)
    }
}