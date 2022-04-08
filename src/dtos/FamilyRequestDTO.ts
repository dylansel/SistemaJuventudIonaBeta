import FamilyDTO from "./FamilyDTO";

type FamilyRequestDTO = Pick<FamilyDTO, "surname">
export default FamilyRequestDTO;