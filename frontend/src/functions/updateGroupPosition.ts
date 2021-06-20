import api from "../service";
import { IGroup } from "../interfaces";

export const updateGroupPosition = async () => {
    try {
      const groups = await api.get<IGroup[]>("/group")
        .then((res) => res.data);
  
      await Promise.all(groups.sort((a, b) => a.position - b.position)
        .map(async ({ _id }, position) => {
          await api.post("/group/updateposition", {
            _id,
            position,
          });
        }))
    } catch (error) {
      throw error;
    };
  };
  