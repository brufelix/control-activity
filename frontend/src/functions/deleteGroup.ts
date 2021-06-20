import api from "../service";

export const deleteGroup = (_id: string) => {
    try {
      api.post("/group/delete", { _id });
    } catch (error) {
      throw error;
    }
  };