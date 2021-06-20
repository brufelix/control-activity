import api from "../service";
import { IActivity } from "../interfaces";

export const updatePositionItemsBack = async (items: IActivity[], referenceIndex: number) => {
    let index = referenceIndex;
    try {
        await Promise.all(
            items.map(async item => {
                await api.post(`/activity/updateposition`, {
                    _id: item.groupId,
                    mainId: item.mainId,
                    newPosition: --index,
                });
            })
        );
    } catch (error) {
        throw error;
    };
};