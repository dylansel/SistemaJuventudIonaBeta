import ActivityDTO from "./ActivityDTO"

type ActivityRequestDTO = Omit<ActivityDTO, "id">
export default ActivityRequestDTO;