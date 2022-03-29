import axios from 'axios';

export async function add(model: string, requestDTO: any) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_DOMAIN}/${model}/add`,requestDTO)
        const data = await response.data
        return data
    } catch (error) {
        throw error
    }
}

export async function addAll(model: string, requestDTO: any[]) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_DOMAIN}/${model}/addAll`,requestDTO)
        const data = await response.data
        return data
    } catch (error) {
        throw error
    }
}

export async function deleteOne(model: string, id: number) {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_DOMAIN!}/${model}/delete/${id}`)
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}

export async function get(model: string, id: number){
    try {
        const response = await axios(`${process.env.REACT_APP_BACKEND_DOMAIN!}/${model}/get/${id}`)
        const data = await response.data
        return data
    } catch (error) {
        throw error
    }
}

export async function getAll(model: string, orderBy?: string) {
    try {
        const response = await axios(`${process.env.REACT_APP_BACKEND_DOMAIN!}/${model}/getAll?${orderBy}`)
        const data = await response.data
        return data
    } catch (error) {
        throw error
    }
}

export async function switchActive(model: string, id: number, active: boolean) {
    try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_DOMAIN!}/${model}/update/${id}`, { active })
        const data = await response.data
        return data
    } catch (error) {
        throw error
    }
}

export async function update(model: string, id: number, requestDTO: any) {
    try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_DOMAIN!}/${model}/update/${id}`,requestDTO)
        const data = await response.data
        return data
    } catch (error) {
        throw error
    }
}