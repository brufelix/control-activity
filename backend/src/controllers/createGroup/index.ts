import { Response, Request } from "express";
import crypto from "crypto";

import { ModelGroup, ModelActivity, ModelProject } from "../../model";

export default async (req: Request, res: Response) => {
  try {
    const { title, groupPosition, idProject } = req.body;
    const now = new Date();
    const mainId = crypto.randomBytes(16).toString("hex");

    const newGroup = new ModelGroup({
      title,
      activities: [],
      position: groupPosition,
      idProject,
    });

    await newGroup.save();

    const newActivity = new ModelActivity({
      mainId,
      groupId: newGroup._id,
      done: false,
      description: "Clique para editar..",
      createAt: now,
      delelivery: null,
      position: 0,
    });

    await newActivity.save();

    await newGroup.updateOne(
      { $push: { activities: newActivity, } },
      null,
      (err, _) => {
        if (err) {
          res.status(500).send({
            error: err
          });
        };
      }
    );

    await ModelProject.updateOne(
      { _id: idProject },
      { $push: { groups: newGroup } },
    )

    res.status(200).json({ code: 200, message: `Group created` });

  } catch (error) {
    res.status(404).json({
      code: 404,
      message: error
    });
  }
};