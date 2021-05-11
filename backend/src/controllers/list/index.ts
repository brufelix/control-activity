import { Response, Request } from "express";
import ModelActivity from "../../model";

export default (req: Request, res: Response) => {
  ModelActivity.find((err, result) => {
    if (err) {
      res.status(404).send();
    };

    try {
      res.status(200).send({
        data: result, 
      });
    } catch (error) {
      res.status(404).send({
        code: 404,
        message: error
      });
    }
  });
};