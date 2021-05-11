import { Response, Request } from "express";
import { ModelActivity, ModelGroup } from "../../model";

export default (req: Request, res: Response) => {
  let now = new Date();
  const { groupId, description, delivery } = req.body;

  try {
    const newActivity = new ModelActivity({
      groupId: groupId,
      done: false,
      description: description,
      createAt: now,
      delivery: delivery
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