import api from "../service";
import { IActivity } from "../interfaces";

export const moveActivity = (
    act: IActivity,
    targetGroup: string,
    position: number,
) => {
    const projectId = localStorage.getItem("@selected_project");
    console.log(projectId);
    try {
        api.post("/activity", {
            groupId: targetGroup,
            description: act.description,
            done: act.done,
            createAt: act.createAt,
            delivery: act.delivery,
            mainId: act.mainId,
            position,
            projectId,
        });

        api.post("/activity/delete", {
            mainId: act.mainId,
            groupId: act.groupId,
        });
    } catch (error) {
        throw error;
    }
};