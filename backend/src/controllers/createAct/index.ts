import crypto from "crypto";
import { Response, Request } from "express";

import { ModelActivity, ModelGroup } from "../../model";

export default (req: Request, res: Response) => {
  let now = new Date();
  const { groupId, description, delivery, createAt, mainId, position, done } = req.body;
  const newId = crypto.randomBytes(16).toString("hex");
  const id = mainId ? mainId : newId;
  const date = createAt ? createAt : now;
  const hasDone = done ? done : false; 

  try {
    const newActivity = new ModelActivity({
      mainId: id,
      groupId: groupId,
      done: hasDone,
      description: description,
      createAt: date,
      delivery: delivery,
      position,
    });

    newActivity.save();

    ModelGroup.updateOne(
      { _id: groupId },
      { $push: { activities: newActivity } },
      null,
      (err, _) => {
        if (err) {
          res.status(500).send({
            error: err
          });
        };
        try {
          res.status(200).json({
            code: 200,
            message: `activity created`
          });
        } catch (error) {
          throw new Error(error)
        };
      }
    );
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error
    });
  };
};