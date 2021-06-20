import { IActivity } from "../interfaces";
import { updatePositionAct } from "./updatePositionAct"; 

export const reorder = (list: any, startIndex: number, endIndex: number) => {
    const result = Array.from<IActivity>(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    updatePositionAct(result);
  
    return result;
  };