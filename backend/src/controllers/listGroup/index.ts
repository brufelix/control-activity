import { Response, Request } from "express";
import { ModelGroup } from "../../model";

export default async (req: Request, res: Response) => {

  const { idProject } = req.body;

  try {
    ModelGroup.find({ idProject }, (err, result) => {
      if (err)
        res.status(404).send();

      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).send({ code: 500, message: error });
  }
};
