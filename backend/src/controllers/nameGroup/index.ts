import { Response, Request } from "express";
import { ModelGroup } from "../../model";

export default async (req: Request, res: Response) => {

  const { _id } = req.body;

  ModelGroup.findOne(
    { _id },
    null,
    null,
    (err, result) => {
      if (err) {
        res.status(404).send();
      };

      try {
        res.status(200).send(result.title);
      } catch (error) {
        res.status(500).send({
          code: 500,
          message: error
        });
      }
    });
};
