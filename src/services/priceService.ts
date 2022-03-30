import axios from 'axios';
import { PriceRequestDTO } from '../dtos/PriceRequestDTO';
import { add, deleteOne, get, getAll, update } from './crudService';

export async function getAllPrices(orderBy?: string) {
    return getAll("price", orderBy)
}

export async function getPriceById(id: number) {
    return get("price", id)
}

export async function getAllPricesByMonth(month: string){
    try {
        const response = await axios(`${process.env.REACT_APP_BACKEND_DOMAIN}/price/getByMonth/${month}`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function addPrice(priceToAdd: PriceRequestDTO) {
    return add("price", priceToAdd)
}

export async function updatePrice(id: number, priceToUpdate: PriceRequestDTO) {
    return update("price", id, priceToUpdate)
}

export async function deletePrice(id: number) {
    return deleteOne("price", id)
}