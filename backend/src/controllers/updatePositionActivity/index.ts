import { Response, Request } from "express";
import { ModelGroup } from "../../model";

export default (req: Request, res: Response) => {
  const { _id, mainId, newPosition } = req.body;
  ModelGroup.updateOne(
    {
      _id,
      "activities.mainId": mainId,
    },
    { $set: { "activities.$.position": newPosition } },
    null,
    (err, _) => {
      if (err) {
        res.status(500).send({ err });
      };

      try {
        res.status(200).json({
          code: 200,
          message: `position updated`
        });
      } catch (error) {
        throw new Error(error)
      };
    });
};