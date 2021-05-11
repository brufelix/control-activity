import { Response, Request } from "express";
import ModelActivity from "../../model";

export default (req: Request, res: Response) => {
  let now = new Date();

  try {
    const newActivity = new ModelActivity({
      groupId: req.body.groupId,
      done: false,
      description: req.body.description,
      createAt: now,
      delivery: req.body.delivery
    });

    newActivity.save();
  } catch (error) {
    res.status(404).json({
      code: 404,
      message: error
    });
  }

  res.status(200).json({
    code: 200,
    message: `activity created`
  });
};