import { Response, Request } from "express";
import { ModelGroup } from "../../model";

export default (req: Request, res: Response) => {
  const { _id, position } = req.body;

  ModelGroup.updateOne(
    { _id },
    { $set: { position } },
    null,
    (err, _) => {
      if (err) {
        res.status(500).send({ err });
      };

      try {
        res.status(200).json({
          code: 200,
          message: `updated group position`
        });
      } catch (error) {
        throw new Error(error)
      };
    });
};