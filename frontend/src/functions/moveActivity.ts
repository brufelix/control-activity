import api from "../service";
import { IActivity } from "../interfaces";

export const moveActivity = (
    act: IActivity,
    targetGroup: string,
    position: number,
) => {
    try {
        api.post("/activity", {
            groupId: targetGroup,
            description: act.description,
            done: act.done,
            createAt: act.createAt,
            delivery: act.delivery,
            mainId: act.mainId,
            position,
        });

        api.post("/activity/delete", {
            mainId: act.mainId,
            groupId: act.groupId,
        });
    } catch (error) {
        throw error;
    }
};