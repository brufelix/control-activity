import crypto from "crypto";
import { Response, Request } from "express";

import { ModelActivity, ModelGroup } from "../../model";

export default (req: Request, res: Response) => {
  let now = new Date();
  const { groupId, description, delivery, createAt, mainId } = req.body;
  const newId = crypto.randomBytes(16).toString("hex");
  const id = mainId ? mainId : newId;
  const date = createAt ? createAt : now;

  try {
    const newActivity = new ModelActivity({
      mainId: id,
      groupId: groupId,
      done: false,
      description: description,
      createAt: date,
      delivery: delivery,
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