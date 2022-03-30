import GroupDTO from "./GroupDTO";

type GroupRequestDTO = Omit<GroupDTO, "id" | "active" | "areaName" >
export default GroupRequestDTO