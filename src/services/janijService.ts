import { janijim } from "../utils/data/fakeJanijimData";
import axios from 'axios';
import { BACKEND_URL } from '../constants/globals';
import JanijDTO from '../interfaces/JanijDTO';

export async function getJanijim(): Promise<JanijDTO[]> {
    try {
        let response = await axios(`${BACKEND_URL}/janij/getAll`)
        let data = await response.data;
        return data;
    } catch (error: any) {
        throw error
    }
}

export function getJanij(ID: number): JanijDTO {
    return janijim.find(
        janij => janij.ID === ID
    ) as JanijDTO;
}

export function deleteJanij(ID: number) {
    janijim.filter(
        janij => janij.ID !== ID
    );
}