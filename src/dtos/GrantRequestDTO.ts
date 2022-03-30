import GrantDTO from "./GrantDTO";

type GrantRequestDTO = Omit<GrantDTO, "id" | "familySurname">
export default GrantRequestDTO