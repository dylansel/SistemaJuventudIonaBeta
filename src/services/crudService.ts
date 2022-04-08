import axios from 'axios';

export const add = async (model: string, requestDTO: any) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_DOMAIN}/${model}/add`, requestDTO)
        const data = await response.data
        return data
    } catch (error) {
        throw error
    }
}

export const addAll = async (model: string, requestDTO: any[]) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_DOMAIN}/${model}/addAll`, requestDTO)
        const data = await response.data
        return data
    } catch (error) {
        throw error
    }
}

export const deleteOne = async (model: string, id: number) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_DOMAIN!}/${model}/delete/${id}`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export const get = async (model: string, id: number): Promise<any> => {
    try {
        const response = await axios(`${process.env.REACT_APP_BACKEND_DOMAIN!}/${model}/get/${id}`)
        const data = await response.data
        return data
    } catch (error) {
        throw error
    }
}

export const getAll = async (model: string, orderBy?: string): Promise<any[]> => {
    try {
        const response = await axios(`${process.env.REACT_APP_BACKEND_DOMAIN!}/${model}/getAll?${orderBy}`)
        const data = await response.data
        return data
    } catch (error) {
        throw error
    }
}

export const switchActive = async (model: string, id: number, active: boolean) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_DOMAIN!}/${model}/update/${id}`, { active })
        const data = await response.data
        return data
    } catch (error) {
        throw error
    }
}

export const update = async (model: string, id: number, requestDTO: any) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_DOMAIN!}/${model}/update/${id}`, requestDTO)
        const data = await response.data
        return data
    } catch (error) {
        throw error
    }
}