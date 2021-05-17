import { Response, Request } from "express";
import { ModelGroup } from "../../model";

export default (req: Request, res: Response) => {
  const { _id, mainId, date } = req.body;
  try {
    ModelGroup.updateOne(
      {
        _id,
        "activities.mainId": mainId,
      },
      { $set: { "activities.$.delivery": date } },
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
          message: `delivery date added`
        });
      });
  } catch (error) {
    res.status(500).send({
      error: error
    });
  };
};
