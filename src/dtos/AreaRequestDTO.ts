import AreaDTO from "./AreaDTO";

type AreaRequestDTO = Omit<AreaDTO, "id" | "active">
export default AreaRequestDTO