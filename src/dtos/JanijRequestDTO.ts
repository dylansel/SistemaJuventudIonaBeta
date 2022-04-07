import JanijDTO from "./JanijDTO";

type JanijRequestDTO = Pick<JanijDTO, "familyId" | "groupId" | "leadersCourse" | "name">
export default JanijRequestDTO