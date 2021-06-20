import api from "../service";
import { IActivity } from "../interfaces";

export const updatePositionAct = (activities: IActivity[]) => {
    try {
      activities.forEach(({ mainId, groupId: _id }, index) => {
        api.post("/activity/updateposition", {
          _id, mainId, newPosition: index
        })
      });
    } catch (error) {
      throw error;
    };
  };