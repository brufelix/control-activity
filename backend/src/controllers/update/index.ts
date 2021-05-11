import { Response, Request } from "express";
import ModelActivity from "../../model";

export default (req: Request, res: Response) => {
  const { _id, description } = req.body;

  ModelActivity.updateOne({ _id }, {
    $set: { description: description }
  }, null, (err, _) => {
    if (err) {
      res.status(500).send({ err });
    };

    try {
      res.status(200).json({
        code: 200,
        message: `updated`
      });
    } catch (error) {
      throw new Error(error)
    };
  });
};