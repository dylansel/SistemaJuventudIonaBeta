import JanijDTO from "../interfaces/JanijDTO";
import { janijim } from "../utils/data/fakeJanijimData";

export function getJanijim() {
    return janijim;
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