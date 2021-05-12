import { Response, Request } from "express";
import { ModelGroup } from "../../model";

export default (req: Request, res: Response) => {
  const { _id, activityId, done } = req.body;
  try {
    ModelGroup.updateOne(
      {
        _id,
        "activities._id": activityId,
      },
      { $set: { "activities.$.done": done } },
      null,
      (error) => {
        if (error) {
          res.status(500).send({
            status: 500,
            message: error
          });
        };

        res.status(200).json({
          code: 200,
          message: `ready value changed`
        });
      });
  } catch (error) {
    res.status(500).send({
      error: error
    });
  };
};
