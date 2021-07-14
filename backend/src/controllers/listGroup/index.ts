import { Response, Request } from "express";
import { ModelGroup } from "../../model";

export default async (req: Request, res: Response) => {

  const { projectId } = req.body;

  try {
    ModelGroup.find({ projectId }, (err, result) => {
      if (err)
        return

      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).send({ code: 500, message: error });
  }
};
