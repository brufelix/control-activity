import { DraggableLocation } from "react-beautiful-dnd";

import { IActivity } from "../interfaces";
import { moveActivity } from "./moveActivity";
import { deleteGroup } from "./deleteGroup";
import { updateItemPositionForward } from "./updateItemPositionForward";
import { updatePositionItemsBack } from "./updatePositionItemsBack";

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
  