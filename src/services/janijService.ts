import axios from "axios";
import JanijDTO from "../dtos/JanijDTO";
import JanijListDTO from "../dtos/JanijListDTO";
import JanijRequestDTO from "../dtos/JanijRequestDTO";
import { add, deleteOne, get, switchActive, update } from "./crudService";
import { getCredentials } from "../auth/authUtils";

const credentials = getCredentials();
export const getAllJanijim = async (
  restricted: boolean = true
): Promise<JanijListDTO[]> => {
  const response = await axios(
    `${process.env.REACT_APP_BACKEND_DOMAIN}?action=list&restricted=${restricted}&${credentials}`
  );
  const data = await response.data.content;
  return data;
};

export const getJanijById = async (name: string): Promise<JanijDTO> => {
  const response = await axios(
    `${process.env.REACT_APP_BACKEND_DOMAIN}?action=data&name=${name}&${credentials}`
  );
  const data = await response.data.content;
  return data;
};

export const addJanij = async (janijToAdd: JanijDTO[]) => {
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_DOMAIN}?action=addWithData&${credentials}`,
    data: JSON.stringify(janijToAdd),
  });
  const data = await response.data.content;
  return data;
};


export const updateJanij = async (janijToUpdate: any) => {
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_DOMAIN}?action=setData&${credentials}`,
    data: JSON.stringify([janijToUpdate]),
  });
  const data = await response.data.content;
  return data;
};

export const switchActiveJanij = async (id: number, active: boolean) => {
  return switchActive("janij", id, active);
};

export const deleteJanij = async (name: string) => {
  try {
    const response = await axios(
      `${
        process.env.REACT_APP_BACKEND_DOMAIN
      }?action=delete&name=${name?.replace(" ", "%20")}&${
        credentials
      }`
    );
    const data = await response.data;
    return data;
  } catch (error: any) {
    throw error;
  }
};
