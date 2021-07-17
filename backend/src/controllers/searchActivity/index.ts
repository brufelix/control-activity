import { Response, Request } from "express";
import { ModelGroup } from "../../model";

export default async (req: Request, res: Response) => {
  const { search, projectId } = req.body;
  
  try {
    ModelGroup.aggregate([
      { $unwind: "$activities" },
      { $match: { "activities.projectId": projectId } },
      { $match: { "activities.description": new RegExp(search, "i") } },
      { $group: { _id: "$position", activities: { $push: "$activities" } } },
    ])
      .exec(function (err, result) {
        if (err)
          res.send(err);
        else {
          res.status(200).send(result);
        }
      })
  } catch (error) {
    console.log(error);
  }
};
