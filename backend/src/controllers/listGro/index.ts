import { Response, Request } from "express";
import { ModelGroup } from "../../model";

export default async (req: Request, res: Response) => {

  ModelGroup.find((err, result) => {
    if (err) {
      res.status(404).send();
    };

    try {
      res.status(200).send({
        data: result,
      });
    } catch (error) {
      res.status(500).send({
        code: 500,
        message: error
      });
    }
  });
};
