import { Response, Request } from "express";
import ModelActivity from "../../model";

export default (req: Request, res: Response) => {
  const { _id } = req.body;

  ModelActivity.deleteOne({ _id }, (err) => {
    if (err) {
      res.status(500).send({
        code: 500,
        message: "error in deleting activity"
      })
    };

    try {
      res.status(200).send({
        code: 200,
        message: "successful deletion",
      })
    } catch (error) {
      res.status(500).send({
        code: 500,
        message: error
      });
    };
  });
};