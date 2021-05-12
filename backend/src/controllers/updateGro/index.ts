import { Response, Request } from "express";
import { ModelGroup } from "../../model";

export default (req: Request, res: Response) => {
  const { _id, newtitle } = req.body;

  ModelGroup.updateOne(
    { _id },
    { $set: { title: newtitle } },
    null,
    (err, _) => {
      if (err) {
        res.status(500).send({ err });
      };

      try {
        res.status(200).json({
          code: 200,
          message: `updated group title`
        });
      } catch (error) {
        throw new Error(error)
      };
    });
};