import { notification } from "antd";
import { DraggableLocation } from "react-beautiful-dnd";

import api from "../service";
import { IActivity } from "../interfaces";

const moveActivity = (
  act: IActivity,
  targetGroup: string,
  position: number,
) => {
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
};

const deleteGroup = (_id: string) => {
  api.post("/group/delete", { _id });
};

const updatePositionItemsBack = async (items: IActivity[], referenceIndex: number) => {
  let index = referenceIndex;

  await Promise.all(
    items.map(async item => {
      await api.post(`/activity/updateposition`, {
        _id: item.groupId,
        mainId: item.mainId,
        newPosition: --index,
      });
    })
  );
};

const updateItemPositionForward = async (items: IActivity[], referenceIndex: number) => {
  let index = referenceIndex;

  await Promise.all(
    items.map(async item => {
      await api.post(`/activity/updateposition`, {
        _id: item.groupId,
        mainId: item.mainId,
        newPosition: ++index,
      });
    })
  );
};

export const reorder = (list: any, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const openNotification = (number: number) => {
  notification.warning({
    message: `Atividades atrasadas :(`,
    description: `Você possui ${number} atividade(s) atrasada(s)`,
    placement: "topLeft",
    duration: 4.5
  });
};

export const move = (
  source: any,
  destination: any,
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
) => {
  const sourceClone = Array.from<IActivity>(source);
  const destClone = Array.from<IActivity>(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  const { groupId } = destClone[0];

  if (!sourceClone.length) {
    deleteGroup(removed["groupId"]);
  }

  moveActivity(removed, groupId, droppableDestination.index);
  updateItemPositionForward(destClone.slice(droppableDestination.index), droppableDestination.index);
  updatePositionItemsBack(sourceClone.slice(droppableSource.index), droppableSource.index);

  removed["groupId"] = groupId;

  destClone.splice(droppableDestination.index, 0, removed);

  const result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
